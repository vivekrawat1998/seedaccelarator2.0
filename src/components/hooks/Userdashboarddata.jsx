import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import api from "../../api/axios";

export default function useDashboardData() {
    const { user, isAuthenticated } = useAuth();
    const [profile, setProfile] = useState(null);
    const [breederData, setBreederData] = useState([]);
    const [acceleratorData, setAcceleratorData] = useState([]);
    const [memberData, setMemberData] = useState([]);
    const [downloads, setDownloads] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;

            try {
                setLoading(true);

                // Fetch profile
                const profileRes = await api.get("/users/me?populate=*");
                setProfile(profileRes.data);

                const profileData = profileRes.data;

                // Fetch breeders
                await fetchBreeders(profileData);

                // Fetch accelerators
                let accelerators = [];
                if (profileData.email) {
                    try {
                        const accByEmail = await api.get(
                            `/accelartor-requests?populate=*&filters[email][$eq]=${encodeURIComponent(profileData.email)}`
                        );
                        accelerators = accByEmail?.data?.data || [];
                    } catch (e) { }
                }
                if (!accelerators.length && profileData.id) {
                    try {
                        const accByUser = await api.get(
                            `/accelartor-requests?populate=*&filters[users_permissions_user][id][$eq]=${profileData.id}`
                        );
                        accelerators = accByUser?.data?.data || [];
                    } catch (e) { }
                }
                setAcceleratorData(accelerators);

                // Fetch members
                let members = [];
                if (profileData.email) {
                    try {
                        const memberByEmail = await api.get(
                            `/members?populate=*&filters[email][$eq]=${encodeURIComponent(profileData.email)}`
                        );
                        members = memberByEmail?.data?.data || [];
                    } catch (e) { }
                }
                if (!members.length && profileData.id) {
                    try {
                        const memberByUser = await api.get(
                            `/members?populate=*&filters[users_permissions_user][id][$eq]=${profileData.id}`
                        );
                        members = memberByUser?.data?.data || [];
                    } catch (e) { }
                }
                setMemberData(members);

                // Fetch orders and downloads
                try {
                    const ordersRes = await api.get(`/orders?filters[user][id][$eq]=${profileData.id}`);
                    setOrders(ordersRes?.data?.data || []);
                } catch (error) {
                    setOrders([]);
                }

                try {
                    const downloadRes = await api.get(
                        `/download-logs?filters[users_permissions_user][id][$eq]=${profileData.id}&populate=*&sort=createdAt:desc`
                    );
                    setDownloads(downloadRes?.data?.data || []);
                } catch (error) {
                    setDownloads([]);
                }
            } catch (err) {
                console.error("Dashboard fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const fetchBreeders = async (profileData) => {
        let breeders = [];

        try {
            if (profileData?.email) {
                const byEmail = await api.get(
                    `/breeder-requests?filters[email][$eq]=${encodeURIComponent(profileData.email)}&populate[0]=nominatedvariety&populate[1]=nominatedvariety.variety`
                );
                breeders = byEmail?.data?.data || [];
            }
        } catch (error) { }

        if (!breeders.length && profileData?.id) {
            try {
                const byUser = await api.get(
                    `/breeder-requests?filters[users_permissions_user][id][$eq]=${profileData.id}&populate[0]=nominatedvariety&populate[1]=nominatedvariety.variety`
                );
                breeders = byUser?.data?.data || [];
            } catch (error) { }
        }

        setBreederData(breeders);
        return breeders;
    };

    const category = profile?.userType ||
        (acceleratorData.length > 0 ? "accelerator" :
            breederData.length > 0 ? "breeder" :
                memberData.length > 0 ? "member" : "normal");

    const refreshBreederById = async (breederId) => {
        try {
            const res = await api.get(
                `/breeder-requests?filters[id][$eq]=${breederId}&populate[0]=nominatedvariety&populate[1]=nominatedvariety.variety`
            );
            const breeders = res?.data?.data || [];
            setBreederData(breeders);
            return breeders;
        } catch (error) {
            console.error("Breeder refresh failed:", error);
            return [];
        }
    };

    return {
        profile,
        breederData,
        acceleratorData,
        memberData,
        downloads,
        orders,
        category,
        loading,
        refreshBreederById
    };
}
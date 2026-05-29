import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import api from "../api/axios";
import BreederVarietiesSection from "../components/breedervarietysection";
import AcceleratorVarietiesSection from "../components/networkpage/AccelaratorvarietySection";

const Field = ({ label, value }) => (
    <div>
        <p className="text-sm text-gray-500">{label}</p>
        <div className="bg-green-50 p-3 rounded-lg font-semibold">
            {value || "N/A"}
        </div>
    </div>
);

const DownloadItem = ({ download }) => {
    const item = download?.attributes || download;
    const createdAt = item?.createdAt ? new Date(item.createdAt) : null;

    return (
        <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 hover:bg-white transition-all">
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                    {item?.fileTitle || item?.fileName || "Download"}
                </p>
                <p className="text-sm text-gray-500 truncate">
                    {item?.filePath || item?.downloadUrl || "N/A"}
                </p>
            </div>
            <div className="text-right ml-4">
                <p className="text-sm font-medium text-gray-900">
                    {createdAt ? createdAt.toLocaleDateString() : "N/A"}
                </p>
                <p className="text-xs text-gray-500">
                    {createdAt
                        ? createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                        : ""}
                </p>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [breederData, setBreederData] = useState([]);
    const [acceleratorData, setAcceleratorData] = useState([]);
    const [memberData, setMemberData] = useState([]);
    const [downloads, setDownloads] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated || !user) {
            navigate("/login", { replace: true });
        }
    }, [isAuthenticated, user, navigate]);

    const category = useMemo(() => {
        if (profile?.userType) return profile.userType;
        if (acceleratorData.length > 0) return "accelerator";
        if (breederData.length > 0) return "breeder";
        if (memberData.length > 0) return "member";
        return "normal";
    }, [profile, acceleratorData, breederData, memberData]);

    const fetchBreeders = async (profileData) => {
        let breeders = [];
        try {
            if (profileData?.email) {
                const byEmail = await api.get(
                    `/breeder-requests?filters[email][$eq]=${encodeURIComponent(profileData.email)}&populate[0]=nominatedvariety&populate[1]=nominatedvariety.variety`
                );
                breeders = byEmail?.data?.data || [];
            }
        } catch (error) {
            console.error("Breeder fetch by email failed:", error);
        }

        if (!breeders.length && profileData?.id) {
            try {
                const byUser = await api.get(
                    `/breeder-requests?filters[users_permissions_user][id][$eq]=${profileData.id}&populate[0]=nominatedvariety&populate[1]=nominatedvariety.variety`
                );
                breeders = byUser?.data?.data || [];
            } catch (error) {
                console.error("Breeder fetch by user failed:", error);
            }
        }

        setBreederData(breeders);
        return breeders;
    };

    const refreshBreederByDocumentId = async (documentId) => {
        try {
            const res = await api.get(
                `/breeder-requests/${documentId}?populate[0]=nominatedvariety&populate[1]=nominatedvariety.variety`
            );
            const breeder = res?.data?.data;
            const breeders = breeder ? [breeder] : [];
            setBreederData(breeders);
            return breeders;
        } catch (error) {
            console.error("Breeder refresh failed:", error);
            return [];
        }
    };

    const refreshAcceleratorByDocumentId = async (documentId) => {
        try {
            const res = await api.get(
                `/accelartor-requests/${documentId}?populate[0]=nominatedvariety&populate[1]=nominatedvariety.accelaratorvariety`
            );
            const acc = res?.data?.data;
            const accs = acc ? [acc] : [];
            setAcceleratorData(accs);
            return accs;
        } catch (error) {
            console.error("Accelerator refresh failed:", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;

            try {
                setLoading(true);

                const profileRes = await api.get("/users/me?populate=*");
                const profileData = profileRes.data;
                setProfile(profileData);

                await fetchBreeders(profileData);

                // Fetch accelerators with nominatedvariety populated
                let accelerators = [];
                try {
                    if (profileData.email) {
                        const accByEmail = await api.get(
                            `/accelartor-requests?populate[0]=nominatedvariety&populate[1]=nominatedvariety.accelaratorvariety&filters[email][$eq]=${encodeURIComponent(profileData.email)}`
                        );
                        accelerators = accByEmail?.data?.data || [];
                    }
                } catch (e) {
                    console.warn("Accelerator fetch by email failed", e);
                }

                if (!accelerators.length && profileData.id) {
                    try {
                        const accByUser = await api.get(
                            `/accelartor-requests?populate[0]=nominatedvariety&populate[1]=nominatedvariety.accelaratorvariety&filters[users_permissions_user][id][$eq]=${profileData.id}`
                        );
                        accelerators = accByUser?.data?.data || [];
                    } catch (e) {
                        console.warn("Accelerator fetch by user failed", e);
                    }
                }
                setAcceleratorData(accelerators);

                let members = [];
                try {
                    if (profileData.email) {
                        const memberByEmail = await api.get(
                            `/members?populate=*&filters[email][$eq]=${encodeURIComponent(profileData.email)}`
                        );
                        members = memberByEmail?.data?.data || [];
                    }
                } catch (e) {
                    console.warn("Member fetch by email failed", e);
                }

                if (!members.length && profileData.id) {
                    try {
                        const memberByUser = await api.get(
                            `/members?populate=*&filters[users_permissions_user][id][$eq]=${profileData.id}`
                        );
                        members = memberByUser?.data?.data || [];
                    } catch (e) {
                        console.warn("Member fetch by user failed", e);
                    }
                }
                setMemberData(members);

                try {
                    const ordersRes = await api.get(`/orders?filters[user][id][$eq]=${profileData.id}`);
                    setOrders(ordersRes?.data?.data || []);
                } catch (error) {
                    console.warn("Orders API not found or failed:", error);
                    setOrders([]);
                }

                try {
                    const downloadRes = await api.get(
                        `/download-logs?filters[users_permissions_user][id][$eq]=${profileData.id}&populate=*&sort=createdAt:desc`
                    );
                    setDownloads(downloadRes?.data?.data || []);
                } catch (error) {
                    console.error("Download history fetch failed:", error);
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

    const handleLogout = () => {
        try {
            logout();
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login", { replace: true });
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading Dashboard...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br mt-24 from-green-50 to-blue-50 p-8">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}
                <div className="bg-white p-6 rounded-2xl shadow flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Welcome {profile?.username}</h1>
                    <button onClick={handleLogout} className="bg-red-600 text-white px-5 py-2 rounded-xl">
                        Logout
                    </button>
                </div>

                {/* Profile */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-xl font-bold mb-4">👤 Profile</h2>
                    <p><strong>Name:</strong> {profile?.username}</p>
                    <p><strong>Email:</strong> {profile?.email}</p>
                    <p><strong>Category:</strong> {category}</p>
                </div>

                {/* Breeder Membership */}
                {breederData.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-xl font-bold mb-6">🌱 Breeder Membership</h2>
                        {breederData.map((item) => {
                            const status = item?.Approval === true ? "Accepted" : "Pending";
                            return (
                                <div key={item.documentId || item.id} className="grid md:grid-cols-2 gap-4 mb-6">
                                    <Field label="Name" value={item?.name} />
                                    <Field label="Email" value={item?.email} />
                                    <Field label="Organization" value={item?.Organization} />
                                    <Field label="Phone" value={item?.phone} />
                                    <Field label="Designation" value={item?.Designation} />
                                    <div>
                                        <p className="text-sm text-gray-500">Membership Status</p>
                                        <div className={`p-3 rounded-lg font-bold text-white ${item?.Approval === true ? "bg-green-500" : "bg-yellow-500"}`}>
                                            {status}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Breeder — Nominated Varieties */}
                {category === "breeder" && breederData.length > 0 && (
                    <BreederVarietiesSection
                        breederData={breederData}
                        refreshBreederByDocumentId={refreshBreederByDocumentId}
                        api={api}
                    />
                )}

                {/* Member Membership */}
                {memberData.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-xl font-bold mb-6">👥 Member Membership</h2>
                        {memberData.map((item) => {
                            const row = item?.attributes || item;
                            const status = row?.Approval === true ? "Accepted" : "Pending";
                            return (
                                <div key={item.documentId || item.id} className="grid md:grid-cols-2 gap-4 mb-6">
                                    <Field label="Name" value={row?.name} />
                                    <Field label="Email" value={row?.email} />
                                    <Field label="Organization" value={row?.Organization} />
                                    <div>
                                        <p className="text-sm text-gray-500">Membership Status</p>
                                        <div className={`p-3 rounded-lg font-bold text-white ${row?.Approval === true ? "bg-green-500" : "bg-yellow-500"}`}>
                                            {status}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Accelerator Membership */}
                {acceleratorData.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-xl font-bold mb-6">🚀 Accelerator Membership</h2>
                        {acceleratorData.map((item) => {
                            const row = item?.attributes || item;
                            const status = row?.Approval === true ? "Accepted" : "Pending";
                            return (
                                <div key={item.documentId || item.id} className="grid md:grid-cols-2 gap-4 mb-6">
                                    <Field label="Name" value={row?.name} />
                                    <Field label="Email" value={row?.email} />
                                    <Field label="Designation" value={row?.Designation} />
                                    <Field label="Mobile" value={row?.Mobilenumber} />
                                    <Field label="Organization" value={row?.NameofOrganization} />
                                    <Field label="Type" value={row?.TypeofOrganization} />
                                    <Field label="Registration No." value={row?.RegistrationNumber} />
                                    <Field label="State" value={row?.State} />
                                    <Field label="Purpose" value={row?.PurposeofParticipation} />
                                    <div>
                                        <p className="text-sm text-gray-500">Membership Status</p>
                                        <div className={`p-3 rounded-lg font-bold text-white ${row?.Approval === true ? "bg-green-500" : "bg-yellow-500"}`}>
                                            {status}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Accelerator — Nominated Varieties */}
                {category === "accelerator" && acceleratorData.length > 0 && (
                    <AcceleratorVarietiesSection
                        acceleratorData={acceleratorData}
                        refreshAcceleratorByDocumentId={refreshAcceleratorByDocumentId}
                        api={api}
                    />
                )}

                {/* Download History */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-xl font-bold mb-6">
                        📥 Download History ({downloads.length})
                    </h2>
                    {downloads.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <div className="text-4xl mb-4">📥</div>
                            <p>No downloads yet</p>
                        </div>
                    ) : (
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {downloads.map((download, index) => (
                                <DownloadItem key={download.documentId || download.id || index} download={download} />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
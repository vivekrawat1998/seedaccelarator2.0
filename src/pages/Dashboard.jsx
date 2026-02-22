// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

/* ================= SMALL FIELD UI ================= */
const Field = ({ label, value }) => (
    <div>
        <p className="text-sm text-gray-500">{label}</p>
        <div className="bg-green-50 p-3 rounded-lg font-semibold">
            {value || "N/A"}
        </div>
    </div>
);

const DownloadItem = ({ download }) => (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 hover:bg-white transition-all">
        <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">{download.title || download.fileName || "Download"}</p>
            <p className="text-sm text-gray-500 truncate">{download.filePath || download.url}</p>
        </div>
        <div className="text-right ml-4">
            <p className="text-sm font-medium text-gray-900">
                {new Date(download.createdAt || download.downloadDate).toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-500">
                {new Date(download.createdAt || download.downloadDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
        </div>
    </div>
);

const Dashboard = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // ✅ PROTECTED ROUTE - Redirect unauthenticated users to /home
    useEffect(() => {
        if (!isAuthenticated || !user) {
            navigate("/home", { replace: true });
            return;
        }
    }, [isAuthenticated, user, navigate]);

    const [profile, setProfile] = useState(null);
    const [breederData, setBreederData] = useState([]);
    const [acceleratorData, setAcceleratorData] = useState([]);
    const [memberData, setMemberData] = useState([]);
    const [orders, setOrders] = useState([]);
    const [downloads, setDownloads] = useState([]); // ✅ NEW: Download history
    const [loading, setLoading] = useState(true);

    /* ================= FETCH DATA ================= */
    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;

            try {
                setLoading(true);

                /* ===== USER PROFILE ===== */
                const profileRes = await api.get("/users/me?populate=*");
                const profileData = profileRes.data;
                setProfile(profileData);

                /* ================= BREEDER FETCH ================= */
                let breeders = [];
                try {
                    if (profileData.email) {
                        const byEmail = await api
                            .get(`/breeder-requests?populate=*&filters[email][$eq]=${encodeURIComponent(profileData.email)}`)
                            .catch(() => ({ data: { data: [] } }));
                        breeders = byEmail.data.data || [];
                    }
                } catch (e) {
                    console.warn("Breeder fetch by email failed", e);
                }

                if (!breeders.length) {
                    const byUser = await api
                        .get(`/breeder-requests?populate=*&filters[users_permissions_user][id][$eq]=${profileData.id}`)
                        .catch(() => ({ data: { data: [] } }));
                    breeders = byUser.data.data || [];
                }
                setBreederData(breeders);

                /* ================= ACCELERATOR FETCH ================= */
                let accelerators = [];
                try {
                    if (profileData.email) {
                        const accByEmail = await api
                            .get(`/accelartor-requests?populate=*&filters[email][$eq]=${encodeURIComponent(profileData.email)}`)
                            .catch(() => ({ data: { data: [] } }));
                        accelerators = accByEmail.data.data || [];
                    }
                } catch (e) {
                    console.warn("Accelerator fetch by email failed", e);
                }

                if (!accelerators.length) {
                    const accByUser = await api
                        .get(`/accelartor-requests?populate=*&filters[users_permissions_user][id][$eq]=${profileData.id}`)
                        .catch(() => ({ data: { data: [] } }));
                    accelerators = accByUser.data.data || [];
                }
                setAcceleratorData(accelerators);

                /* ================= MEMBER FETCH ================= */
                let members = [];
                try {
                    if (profileData.email) {
                        const memberByEmail = await api
                            .get(`/members?populate=*&filters[email][$eq]=${encodeURIComponent(profileData.email)}`)
                            .catch(() => ({ data: { data: [] } }));
                        members = memberByEmail.data.data || [];
                    }
                } catch (e) {
                    console.warn("Member fetch by email failed", e);
                }

                if (!members.length && profileData.id) {
                    const memberByUser = await api
                        .get(`/members?populate=*&filters[users_permissions_user][id][$eq]=${profileData.id}`)
                        .catch(() => ({ data: { data: [] } }));
                    members = memberByUser.data.data || [];
                }
                setMemberData(members);

                /* ================= ORDERS ================= */
                const ordersRes = await api
                    .get(`/orders?filters[user][id][$eq]=${profileData.id}`)
                    .catch(() => ({ data: { data: [] } }));
                setOrders(ordersRes.data.data || []);

                /* ================= DOWNLOAD HISTORY ================= */
                // Try common download log endpoints
                const downloadRes = await api
                    .get(`/download-logs?filters[user][id][$eq]=${profileData.id}&populate=*&sort=createdAt:desc`)
                    .catch(() =>
                        api.get(`/downloads?filters[user][id][$eq]=${profileData.id}&populate=*&sort=createdAt:desc`)
                            .catch(() => ({ data: { data: [] } }))
                    );
                setDownloads(downloadRes.data.data || []);

            } catch (err) {
                console.error("Dashboard fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    /* ================= CATEGORY DETECTION ================= */
    const category = (() => {
        if (profile?.userType) return profile.userType;
        if (acceleratorData.length > 0) return "accelerator";
        if (breederData.length > 0) return "breeder";
        if (memberData.length > 0) return "member";
        return "normal";
    })();

    /* ================= LOADING ================= */
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading Dashboard...
            </div>
        );
    }

    const handleLogout = () => {
        try {
            logout();
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/home", { replace: true });
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    /* ================= UI ================= */
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* HEADER */}
                <div className="bg-white p-6 rounded-2xl shadow flex justify-between">
                    <h1 className="text-2xl font-bold">
                        Welcome {profile?.username}
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-5 py-2 rounded-xl"
                    >
                        Logout
                    </button>
                </div>

                {/* PROFILE */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-xl font-bold mb-4">👤 Profile</h2>
                    <p><strong>Name:</strong> {profile?.username}</p>
                    <p><strong>Email:</strong> {profile?.email}</p>
                    <p><strong>Category:</strong> {category}</p>
                </div>

                {/* 🌱 BREEDER MEMBERSHIP */}
                {breederData.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-xl font-bold mb-6">🌱 Breeder Membership</h2>
                        {breederData.map((item) => {
                            const status = item.Approval === true ? "Accepted" : "Pending";
                            return (
                                <div key={item.id} className="grid md:grid-cols-2 gap-4 mb-6">
                                    <Field label="Name" value={item.name} />
                                    <Field label="Email" value={item.email} />
                                    <Field label="Organization" value={item.Organization} />
                                    <Field label="Phone" value={item.phone} />
                                    <Field label="Designation" value={item.Designation} />
                                    <div>
                                        <p className="text-sm text-gray-500">Membership Status</p>
                                        <div className={`p-3 rounded-lg font-bold text-white ${item.Approval === true ? "bg-green-500" : "bg-yellow-500"
                                            }`}>
                                            {status}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* 👥 MEMBER MEMBERSHIP */}
                {memberData.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-xl font-bold mb-6">👥 Member Membership</h2>
                        {memberData.map((item) => {
                            const status = item.Approval === true ? "Accepted" : "Pending";
                            return (
                                <div key={item.id} className="grid md:grid-cols-2 gap-4 mb-6">
                                    <Field label="Name" value={item.name || item.attributes?.name} />
                                    <Field label="Email" value={item.email || item.attributes?.email} />
                                    <Field label="Organization" value={item.Organization || item.attributes?.Organization} />
                                    <Field label="Approval Status" value={status} />
                                    <div>
                                        <p className="text-sm text-gray-500">Membership Status</p>
                                        <div className={`p-3 rounded-lg font-bold text-white ${item.Approval === true || item.attributes?.Approval === true
                                            ? "bg-green-500" : "bg-yellow-500"
                                            }`}>
                                            {status}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* 🚀 ACCELERATOR MEMBERSHIP */}
                {acceleratorData.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-xl font-bold mb-6">🚀 Accelerator Membership</h2>
                        {acceleratorData.map((item) => {
                            const status = item.Approval === true ? "Accepted" : "Pending";
                            return (
                                <div key={item.id} className="grid md:grid-cols-2 gap-4 mb-6">
                                    <Field label="Name" value={item.name} />
                                    <Field label="Email" value={item.email} />
                                    <Field label="Designation" value={item.Designation} />
                                    <Field label="Mobile" value={item.Mobilenumber} />
                                    <Field label="Organization" value={item.NameofOrganization} />
                                    <Field label="Type" value={item.TypeofOrganization} />
                                    <Field label="Registration No." value={item.RegistrationNumber} />
                                    <Field label="State" value={item.State} />
                                    <Field label="Purpose" value={item.PurposeofParticipation} />
                                    <div>
                                        <p className="text-sm text-gray-500">Membership Status</p>
                                        <div className={`p-3 rounded-lg font-bold text-white ${item.Approval === true ? "bg-green-500" : "bg-yellow-500"
                                            }`}>
                                            {status}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* 📥 DOWNLOAD HISTORY - NEW SECTION */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-xl font-bold mb-6">📥 Download History ({downloads.length})</h2>

                    {downloads.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <div className="text-4xl mb-4">📥</div>
                            <p>No downloads yet</p>
                        </div>
                    ) : (
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {downloads.map((download, index) => (
                                <DownloadItem key={download.id || index} download={download} />
                            ))}
                        </div>
                    )}
                </div>

                {/* 📦 ORDERS */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-xl font-bold mb-4">📦 Orders ({orders.length})</h2>
                    {orders.length === 0 ? (
                        <p>No orders yet</p>
                    ) : (
                        orders.map((o) => (
                            <div key={o.id} className="border-b py-2">
                                #{o.id} — ₹{o.attributes?.total}
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
};

export default Dashboard;

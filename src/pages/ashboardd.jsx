import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import api from "../api/axios";


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
                        ? createdAt.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })
                        : ""}
                </p>
            </div>
        </div>
    );
};


const emptyVariety = {
    variety: "",
    Duration: "",
    Ecosystem: "",
    MarketSegment: "",
    GrainShape: "",
    PotentialYields: "",
    Bsavailability: "",
    Seedavailability: "",
    StatetRecommended: "",
    SpecialTrait: "",
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
    const [nominatedVarieties, setNominatedVarieties] = useState([{ ...emptyVariety }]);


    const [loading, setLoading] = useState(true);
    const [savingVarieties, setSavingVarieties] = useState(false);


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


    const mapVarietyRowsToForm = (rows = []) =>
        rows.map((item) => ({
            variety: item?.variety || "",
            Duration: item?.Duration ?? "",
            Ecosystem: item?.Ecosystem || "",
            MarketSegment: item?.MarketSegment || "",
            GrainShape: item?.GrainShape ?? "",
            PotentialYields: item?.PotentialYields ?? "",
            Bsavailability: item?.Bsavailability ?? "",
            Seedavailability: item?.Seedavailability ?? "",
            StatetRecommended:
                item?.StatetRecommended || item?.StateitRecommended || "",
            SpecialTrait: item?.SpecialTrait || "",
        }));


    const hydrateVarietyForm = (breeders = []) => {
        if (!breeders.length) {
            setNominatedVarieties([{ ...emptyVariety }]);
            return;
        }


        const breeder = breeders[0];
        const rows = breeder?.nominatedvariety?.variety || [];


        if (Array.isArray(rows) && rows.length > 0) {
            setNominatedVarieties(mapVarietyRowsToForm(rows));
        } else {
            setNominatedVarieties([{ ...emptyVariety }]);
        }
    };


    const fetchBreeders = async (profileData) => {
        let breeders = [];


        try {
            if (profileData?.email) {
                const byEmail = await api.get(
                    `/breeder-requests?filters[email][$eq]=${encodeURIComponent(
                        profileData.email
                    )}&populate[0]=nominatedvariety&populate[1]=nominatedvariety.variety`
                );
                breeders = byEmail?.data?.data || [];
                console.log("Breeders fetched by email:", breeders);
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
                console.log("Breeders fetched by user:", breeders);
            } catch (error) {
                console.error("Breeder fetch by user failed:", error);
            }
        }


        setBreederData(breeders);
        hydrateVarietyForm(breeders);
        return breeders;
    };


    const refreshBreederById = async (breederId) => {
        try {
            const res = await api.get(
                `/breeder-requests?filters[id][$eq]=${breederId}&populate[0]=nominatedvariety&populate[1]=nominatedvariety.variety`
            );
            const breeders = res?.data?.data || [];
            setBreederData(breeders);
            hydrateVarietyForm(breeders);
            return breeders;
        } catch (error) {
            console.error("Breeder refresh failed:", error);
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


                let accelerators = [];
                try {
                    if (profileData.email) {
                        const accByEmail = await api.get(
                            `/accelartor-requests?populate=*&filters[email][$eq]=${encodeURIComponent(
                                profileData.email
                            )}`
                        );
                        accelerators = accByEmail?.data?.data || [];
                    }
                } catch (e) {
                    console.warn("Accelerator fetch by email failed", e);
                }


                if (!accelerators.length && profileData.id) {
                    try {
                        const accByUser = await api.get(
                            `/accelartor-requests?populate=*&filters[users_permissions_user][id][$eq]=${profileData.id}`
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
                            `/members?populate=*&filters[email][$eq]=${encodeURIComponent(
                                profileData.email
                            )}`
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
                    const ordersRes = await api.get(
                        `/orders?filters[user][id][$eq]=${profileData.id}`
                    );
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


    const handleVarietyChange = (index, field, value) => {
        setNominatedVarieties((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };


    const addVarietyRow = () => {
        setNominatedVarieties((prev) => [...prev, { ...emptyVariety }]);
    };


    const removeVarietyRow = (index) => {
        setNominatedVarieties((prev) =>
            prev.length === 1 ? prev : prev.filter((_, i) => i !== index)
        );
    };


    const handleSaveNominations = async () => {
        if (!breederData.length) {
            alert("No breeder data found");
            return;
        }


        try {
            setSavingVarieties(true);


            const breederId = breederData[0].id;


            const cleanedVarieties = nominatedVarieties
                .map((item) => ({
                    variety: item.variety?.trim() || "",
                    Duration:
                        item.Duration !== "" && item.Duration !== null
                            ? Number(item.Duration)
                            : null,
                    Ecosystem: item.Ecosystem?.trim() || "",
                    MarketSegment: item.MarketSegment?.trim() || "",
                    GrainShape:
                        item.GrainShape !== "" && item.GrainShape !== null
                            ? Number(item.GrainShape)
                            : null,
                    PotentialYields:
                        item.PotentialYields !== "" &&
                            item.PotentialYields !== null
                            ? Number(item.PotentialYields)
                            : null,
                    Bsavailability:
                        item.Bsavailability !== "" && item.Bsavailability !== null
                            ? Number(item.Bsavailability)
                            : null,
                    Seedavailability:
                        item.Seedavailability !== "" &&
                            item.Seedavailability !== null
                            ? Number(item.Seedavailability)
                            : null,
                    StatetRecommended: item.StatetRecommended?.trim() || "",
                    SpecialTrait: item.SpecialTrait?.trim() || "",
                }))
                .filter((item) => item.variety);


            const payload = {
                data: {
                    nominatedvariety: {
                        variety: cleanedVarieties,
                    },
                },
            };


            console.log("SAVE PAYLOAD =>", payload);


            const saveRes = await api.put(`/breeder-requests/${breederId}`, payload);
            console.log("SAVE RESPONSE =>", saveRes.data);


            await refreshBreederById(breederId);


            alert("Varieties saved successfully");
        } catch (error) {
            console.error("SAVE ERROR =>", error?.response?.data || error);
            alert("Save failed. Check console.");
        } finally {
            setSavingVarieties(false);
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
                <div className="bg-white p-6 rounded-2xl shadow flex justify-between items-center">
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


                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-xl font-bold mb-4">👤 Profile</h2>
                    <p><strong>Name:</strong> {profile?.username}</p>
                    <p><strong>Email:</strong> {profile?.email}</p>
                    <p><strong>Category:</strong> {category}</p>
                </div>


                {breederData.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-xl font-bold mb-6">🌱 Breeder Membership</h2>


                        {breederData.map((item) => {
                            const status =
                                item?.Approval === true ? "Accepted" : "Pending";


                            return (
                                <div
                                    key={item.id}
                                    className="grid md:grid-cols-2 gap-4 mb-6"
                                >
                                    <Field label="Name" value={item?.name} />
                                    <Field label="Email" value={item?.email} />
                                    <Field
                                        label="Organization"
                                        value={item?.Organization}
                                    />
                                    <Field label="Phone" value={item?.phone} />
                                    <Field
                                        label="Designation"
                                        value={item?.Designation}
                                    />
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Membership Status
                                        </p>
                                        <div
                                            className={`p-3 rounded-lg font-bold text-white ${item?.Approval === true
                                                ? "bg-green-500"
                                                : "bg-yellow-500"
                                                }`}
                                        >
                                            {status}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}


                        <details className="mt-4 p-4 bg-gray-100 rounded-xl">
                            <summary className="cursor-pointer font-medium">
                                Debug: Raw breeder data
                            </summary>
                            <pre className="text-xs mt-3 overflow-auto">
                                {JSON.stringify(breederData[0], null, 2)}
                            </pre>
                        </details>
                    </div>
                )}


                {category === "breeder" && breederData.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl shadow">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">
                                🌾 Nominated Varieties
                            </h2>
                            <button
                                type="button"
                                onClick={addVarietyRow}
                                className="bg-green-600 text-white px-4 py-2 rounded-xl"
                            >
                                + Add Variety
                            </button>
                        </div>


                        {breederData[0]?.nominatedvariety?.id ? (
                            <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200">
                                <p className="font-semibold text-green-800">
                                    Component linked successfully
                                </p>
                                <p className="text-sm text-green-700">
                                    Varieties loaded:{" "}
                                    {breederData[0]?.nominatedvariety?.variety?.length || 0}
                                </p>
                            </div>
                        ) : (
                            <div className="mb-6 p-4 rounded-xl bg-yellow-50 border border-yellow-200">
                                <p className="font-semibold text-yellow-800">
                                    No nominated varieties saved yet
                                </p>
                            </div>
                        )}


                        <div className="space-y-6">
                            {nominatedVarieties.map((item, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-2xl p-5 bg-gray-50 space-y-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-lg">
                                            Variety #{index + 1}
                                        </h3>
                                        {nominatedVarieties.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeVarietyRow(index)}
                                                className="text-red-600 font-medium"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>


                                    <div className="grid md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Variety *"
                                            value={item.variety}
                                            onChange={(e) =>
                                                handleVarietyChange(
                                                    index,
                                                    "variety",
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded-xl p-3"
                                        />


                                        <input
                                            type="number"
                                            placeholder="Duration"
                                            value={item.Duration}
                                            onChange={(e) =>
                                                handleVarietyChange(
                                                    index,
                                                    "Duration",
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded-xl p-3"
                                        />


                                        <input
                                            type="text"
                                            placeholder="Ecosystem"
                                            value={item.Ecosystem}
                                            onChange={(e) =>
                                                handleVarietyChange(
                                                    index,
                                                    "Ecosystem",
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded-xl p-3"
                                        />


                                        <input
                                            type="text"
                                            placeholder="Market Segment"
                                            value={item.MarketSegment}
                                            onChange={(e) =>
                                                handleVarietyChange(
                                                    index,
                                                    "MarketSegment",
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded-xl p-3"
                                        />


                                        <input
                                            type="number"
                                            placeholder="Grain Shape"
                                            value={item.GrainShape}
                                            onChange={(e) =>
                                                handleVarietyChange(
                                                    index,
                                                    "GrainShape",
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded-xl p-3"
                                        />


                                        <input
                                            type="number"
                                            placeholder="Potential Yields"
                                            value={item.PotentialYields}
                                            onChange={(e) =>
                                                handleVarietyChange(
                                                    index,
                                                    "PotentialYields",
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded-xl p-3"
                                        />


                                        <input
                                            type="number"
                                            placeholder="Bs availability"
                                            value={item.Bsavailability}
                                            onChange={(e) =>
                                                handleVarietyChange(
                                                    index,
                                                    "Bsavailability",
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded-xl p-3"
                                        />


                                        <input
                                            type="number"
                                            placeholder="Seed availability"
                                            value={item.Seedavailability}
                                            onChange={(e) =>
                                                handleVarietyChange(
                                                    index,
                                                    "Seedavailability",
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded-xl p-3"
                                        />


                                        <input
                                            type="text"
                                            placeholder="State Recommended"
                                            value={item.StatetRecommended}
                                            onChange={(e) =>
                                                handleVarietyChange(
                                                    index,
                                                    "StatetRecommended",
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded-xl p-3 md:col-span-2"
                                        />


                                        <textarea
                                            placeholder="Special Trait"
                                            value={item.SpecialTrait}
                                            onChange={(e) =>
                                                handleVarietyChange(
                                                    index,
                                                    "SpecialTrait",
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded-xl p-3 md:col-span-2"
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>


                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={handleSaveNominations}
                                disabled={savingVarieties}
                                className="bg-blue-600 text-white px-6 py-3 rounded-xl disabled:opacity-50"
                            >
                                {savingVarieties ? "Saving..." : "Save Nominated Varieties"}
                            </button>
                        </div>
                    </div>
                )}


                {memberData.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-xl font-bold mb-6">👥 Member Membership</h2>
                        {memberData.map((item) => {
                            const row = item?.attributes || item;
                            const status =
                                row?.Approval === true ? "Accepted" : "Pending";


                            return (
                                <div
                                    key={item.id}
                                    className="grid md:grid-cols-2 gap-4 mb-6"
                                >
                                    <Field label="Name" value={row?.name} />
                                    <Field label="Email" value={row?.email} />
                                    <Field
                                        label="Organization"
                                        value={row?.Organization}
                                    />
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Membership Status
                                        </p>
                                        <div
                                            className={`p-3 rounded-lg font-bold text-white ${row?.Approval === true
                                                ? "bg-green-500"
                                                : "bg-yellow-500"
                                                }`}
                                        >
                                            {status}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}


                {acceleratorData.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-xl font-bold mb-6">
                            🚀 Accelerator Membership
                        </h2>
                        {acceleratorData.map((item) => {
                            const row = item?.attributes || item;
                            const status =
                                row?.Approval === true ? "Accepted" : "Pending";


                            return (
                                <div
                                    key={item.id}
                                    className="grid md:grid-cols-2 gap-4 mb-6"
                                >
                                    <Field label="Name" value={row?.name} />
                                    <Field label="Email" value={row?.email} />
                                    <Field
                                        label="Designation"
                                        value={row?.Designation}
                                    />
                                    <Field
                                        label="Mobile"
                                        value={row?.Mobilenumber}
                                    />
                                    <Field
                                        label="Organization"
                                        value={row?.NameofOrganization}
                                    />
                                    <Field
                                        label="Type"
                                        value={row?.TypeofOrganization}
                                    />
                                    <Field
                                        label="Registration No."
                                        value={row?.RegistrationNumber}
                                    />
                                    <Field label="State" value={row?.State} />
                                    <Field
                                        label="Purpose"
                                        value={row?.PurposeofParticipation}
                                    />
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Membership Status
                                        </p>
                                        <div
                                            className={`p-3 rounded-lg font-bold text-white ${row?.Approval === true
                                                ? "bg-green-500"
                                                : "bg-yellow-500"
                                                }`}
                                        >
                                            {status}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}


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
                                <DownloadItem key={download.id || index} download={download} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default Dashboard;

show a button do you want to nominate your variety and show users all variety and he can also add new variety which he can see in the dashboard
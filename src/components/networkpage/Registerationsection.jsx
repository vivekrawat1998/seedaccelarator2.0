import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, updateUserRole } from "../../api/auth";
import SeedScalingTerms from "../../components/networkpage/Seedterms";
import { submitAccelartorRequest } from "../../redux/membership/Accelaratorslice";
import { submitBreederRequest } from "../../redux/membership/Breederslice";
import Typography from "../../ui/Heading";
import { useAuth } from "../../context/AuthProvider";
import api from "../../api/axios";
import { Navigate, useNavigate } from "react-router-dom";

const orgTypes = [
    "FPO/FPC", "NGO", "ICAR Institutes/Name", "Universities/Name",
    "National Seed Organisation", "State Seed Organisation",
    "State Seed Certification Agency", "State department of Agriculture",
    "Private seed company", "Individual farmers", "Other"
];

const participationTypes = [
    "Seed multiplication", "Research Collaboration",
    "Knowledge Sharing", "Trainings", "Other"
];

const SuccessModal = ({ show, onClose, userType }) => {
    if (!show) return null;
    const handleDashboard = () => window.location.href = "/dashboard";

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-sm w-full text-center font-karla">
                <h3 className="text-xl font-bold text-green-700 mb-4 font-Nunito">🎉 Success!</h3>
                <p className="mb-6 text-gray-700">Account created as {userType}!</p>
                <button
                    onClick={handleDashboard}
                    className="bg-green-700 px-6 py-3 rounded-lg text-white font-semibold hover:bg-green-600 w-full transition-all"
                >
                    Go to Dashboard →
                </button>
            </div>
        </div>
    );
};

export default function RegistrationPage() {
    const dispatch = useDispatch();
    const { login } = useAuth();
    const navigate = useNavigate();
    const acceleratorState = useSelector((state) => state.accelartor) || { status: "idle" };
    const breederState = useSelector((state) => state.breeder) || { isLoading: false };

    const [registerAs, setRegisterAs] = useState("none");
    const [showModal, setShowModal] = useState(false);
    const [showseedsterms, setSeedsterms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
        Designation: "",
        Mobilenumber: "",
        NameofOrganization: "",
        TypeofOrganization: "",
        RegistrationNumber: "",
        State: "",
        PurposeofParticipation: "",
        Declaration: false,
    });

    const handleOrgTypeChange = (value) => {
        setFormData(prev => ({ ...prev, TypeofOrganization: value }));
        setError("");
    };

    const handlePurposeChange = (value) => {
        setFormData(prev => ({ ...prev, PurposeofParticipation: value }));
        setError("");
    };

    // ✅ Numbers only for mobile
    const handleMobileChange = (e) => {
        const numericValue = e.target.value.replace(/\D/g, '');
        setFormData(prev => ({
            ...prev,
            [e.target.name]: numericValue,
        }));
        setError("");
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setError("");
    };

    // ✅ FIXED: Exact Strapi Schema Match
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.username || !formData.email || !formData.password) {
            setError("Please fill all account fields");
            return;
        }
        if (!formData.name || !formData.Mobilenumber || !formData.NameofOrganization) {
            setError("Please fill all profile fields");
            return;
        }
        if (formData.Mobilenumber && !/^\d{10}$/.test(formData.Mobilenumber)) {
            setError("Mobile must be exactly 10 digits");
            return;
        }
        if (!formData.Declaration) {
            setError("Please accept terms");
            return;
        }
        if (registerAs === "accelerator") {
            if (!formData.TypeofOrganization) {
                setError("Please select organization type");
                return;
            }
            if (!formData.PurposeofParticipation) {
                setError("Please select purpose");
                return;
            }
        }

        setLoading(true);
        setError("");

        try {
            // 1. Register user
            console.log("📝 Creating user...");
            const userData = await registerUser({
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });

            // 2. Login
            console.log("🔐 Logging in...");
            login(userData);

            // 3. Verify profile
            console.log("👤 Fetching profile...");
            await api.get("/users/me");

            // 3.a Update userType after login (avoid sending unknown fields to register endpoint)
            try {
                await updateUserRole(registerAs === "accelerator" ? "accelerator" : "breeder");
                console.log("🔁 userType update attempted");
            } catch (e) {
                console.warn("Could not update userType after register:", e.message || e);
            }

            // 4. ✅ FIXED BREEDER/ACCELERATOR DATA
            if (registerAs === "accelerator") {
                const acceleratorData = {
                    name: formData.name,
                    Designation: formData.Designation || "",
                    Mobilenumber: parseInt(formData.Mobilenumber),           // ✅ INTEGER
                    email: formData.email,
                    NameofOrganization: formData.NameofOrganization,
                    TypeofOrganization: formData.TypeofOrganization,
                    RegistrationNumber: parseInt(formData.RegistrationNumber) || null,  // ✅ INTEGER/NULL
                    State: formData.State || "",
                    PurposeofParticipation: formData.PurposeofParticipation,
                    Declaration: true,
                };
                console.log("🚀 Accelerator data:", acceleratorData);
                await dispatch(submitAccelartorRequest(acceleratorData)).unwrap();
            } else {
                // ✅ FIXED: Breeder schema with email for dashboard lookup
                const breederData = {
                    name: formData.name,
                    Designation: formData.Designation || "",      // ⭐ ADD THIS
                    Organization: formData.NameofOrganization,    // ⭐ FIX FIELD NAME
                    email: formData.email,                        // ⭐ KEEP EMAIL
                    phone: parseInt(formData.Mobilenumber),       // INTEGER
                    Declaration: true,
                };
                console.log("🌱 Breeder data (FIXED):", breederData);
                await dispatch(submitBreederRequest(breederData)).unwrap();
            }

            console.log("🎉 Registration COMPLETELY successful!");
            setShowModal(true);
        } catch (err) {
            console.error("❌ Error:", err.response?.data || err);
            const errorMsg = err?.response?.data?.error?.message ||
                err?.response?.data?.message ||
                "Registration failed";
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setRegisterAs("none");
        setShowModal(false);
        navigate("/network-members#register");
        setSeedsterms(false);
        setError("");
        setFormData({
            username: "", email: "", password: "", name: "", Designation: "",
            Mobilenumber: "", NameofOrganization: "", TypeofOrganization: "",
            RegistrationNumber: "", State: "", PurposeofParticipation: "", Declaration: false,
        });
    };

    if (registerAs === "none") {
        return (
            <div className=" bg-gradient-to-br from-green-50 to-blue-50 py-10 px-4">
                <div className="max-w-md mx-auto text-center font-karla">
                    <Typography variant="h1" className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 text-transparent bg-clip-text mb-6">
                        Create Account
                    </Typography>
                    <p className="text-xl text-gray-600 mb-12 font-Karla max-w-md mx-auto leading-relaxed">
                        Joining the SAN is voluntary, and there is no membership fee at present.”
                    </p>
                    <div className=" flex gap-10   justify-between">
                        <button
                            className="w-full bg-gradient-to-r cursor-pointer from-green-600 to-green-700 text-white py-6 px-8 rounded-2xl shadow-xl font-bold text-lg hover:shadow-2xl hover:from-green-700 transition-all"
                            onClick={() => setRegisterAs("accelerator")}
                        >
                            🚀 Accelerator
                        </button>
                        <button
                            className="w-full bg-gradient-to-r cursor-pointer from-yellow-500 to-yellow-600 text-white py-6 px-8 rounded-2xl shadow-xl font-bold text-lg hover:shadow-2xl hover:from-yellow-600 transition-all"
                            onClick={() => setRegisterAs("breeder")}
                        >
                            🌱 Breeder
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <section className="bg-[#f3f4f6] py-16 px-4 min-h-screen">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border p-8 md:p-12">
                    <div className="text-center mb-12">
                        <Typography variant="h1" className={`text-4xl font-bold mb-4 font-Nunito ${registerAs === "accelerator" ? "text-green-700" : "text-yellow-700"
                            }`}>
                            {registerAs === "accelerator" ? "Accelerator" : "Breeder"} Registration
                        </Typography>
                        <p className="text-xl text-gray-600">Create account + profile in one step</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* ACCOUNT */}
                        <fieldset className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border-2 border-blue-200">
                            <legend className="text-2xl font-bold text-blue-700 mb-6">👤 Account Creation</legend>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block font-semibold text-gray-700 mb-3">Username *</label>
                                    <input name="username" value={formData.username} onChange={handleChange}
                                        className="w-full border-2 border-blue-300 rounded-xl py-4 px-5 focus:ring-2 focus:ring-blue-500" required />
                                </div>
                                <div>
                                    <label className="block font-semibold text-gray-700 mb-3">Email *</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                                        className="w-full border-2 border-blue-300 rounded-xl py-4 px-5 focus:ring-2 focus:ring-blue-500" required />
                                </div>
                                <div>
                                    <label className="block font-semibold text-gray-700 mb-3">Password *</label>
                                    <input type="password" name="password" value={formData.password} onChange={handleChange}
                                        className="w-full border-2 border-blue-300 rounded-xl py-4 px-5 focus:ring-2 focus:ring-blue-500" required />
                                </div>
                            </div>
                        </fieldset>

                        {/* PERSONAL */}
                        <fieldset className="p-8 bg-gray-50 rounded-2xl border-2 border-gray-200">
                            <legend className="text-2xl font-bold text-gray-800 mb-6">👤 Personal Info</legend>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block font-semibold text-gray-700 mb-3">Full Name *</label>
                                    <input name="name" value={formData.name} onChange={handleChange}
                                        className="w-full border rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500" required />
                                </div>
                                <div>
                                    <label className="block font-semibold text-gray-700 mb-3">Designation (Optional)</label>
                                    <input name="Designation" value={formData.Designation} onChange={handleChange}
                                        className="w-full border rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block font-semibold text-gray-700 mb-3">Mobile Number *</label>
                                    <input
                                        type="tel"
                                        name="Mobilenumber"
                                        value={formData.Mobilenumber}
                                        onChange={handleMobileChange}
                                        maxLength={16}
                                        className="w-full border rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500"
                                        required
                                        placeholder=""
                                    />
                                </div>
                            </div>
                        </fieldset>

                        {/* ACCELERATOR FIELDS */}
                        {registerAs === "accelerator" && (
                            <>
                                <fieldset className="p-8 bg-blue-50 rounded-2xl border-2 border-blue-200">
                                    <legend className="text-2xl font-bold text-blue-600 mb-6">🏢 Organization</legend>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block font-semibold text-gray-700 mb-3">Organization Name *</label>
                                            <input name="NameofOrganization" value={formData.NameofOrganization} onChange={handleChange}
                                                className="w-full border rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500" required />
                                        </div>

                                        <div>
                                            <label className="block font-semibold text-gray-700 mb-3">Organization Type *</label>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-2 bg-white rounded-xl border">
                                                {orgTypes.map((type) => (
                                                    <label key={type} className={`flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all ${formData.TypeofOrganization === type ? "bg-blue-100 border-blue-400 shadow-md" : "hover:bg-blue-50 border-gray-200"
                                                        }`}>
                                                        <input type="radio" name="TypeofOrganization" value={type}
                                                            checked={formData.TypeofOrganization === type}
                                                            onChange={() => handleOrgTypeChange(type)}
                                                            className="w-5 h-5 accent-blue-600 mr-3" />
                                                        <span className="text-sm">{type}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block font-semibold text-gray-700 mb-3">Reg. Number (Optional)</label>
                                                <input name="RegistrationNumber" value={formData.RegistrationNumber} onChange={handleChange}
                                                    className="w-full border rounded-xl py-3 px-4"
                                                    type="number" placeholder="Optional" />
                                            </div>
                                            <div>
                                                <label className="block font-semibold text-gray-700 mb-3">State *</label>
                                                <input name="State" value={formData.State} onChange={handleChange}
                                                    className="w-full border rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500" required />
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset className="p-8 bg-purple-50 rounded-2xl border-2 border-purple-200">
                                    <legend className="text-2xl font-bold text-purple-600 mb-6">🎯 Purpose *</legend>
                                    <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto p-2 bg-white rounded-xl border">
                                        {participationTypes.map((purpose) => (
                                            <label key={purpose} className={`flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all ${formData.PurposeofParticipation === purpose ? "bg-purple-100 border-purple-400 shadow-md" : "hover:bg-purple-50 border-gray-200"
                                                }`}>
                                                <input type="radio" name="PurposeofParticipation" value={purpose}
                                                    checked={formData.PurposeofParticipation === purpose}
                                                    onChange={() => handlePurposeChange(purpose)}
                                                    className="w-5 h-5 accent-purple-600 mr-3" />
                                                <span className="text-sm">{purpose}</span>
                                            </label>
                                        ))}
                                    </div>
                                </fieldset>
                            </>
                        )}

                        {/* BREEDER - SIMPLIFIED */}
                        {registerAs === "breeder" && (
                            <fieldset className="p-8 bg-yellow-50 rounded-2xl border-2 border-yellow-200">
                                <legend className="text-2xl font-bold text-yellow-700 mb-6">🏢 Organization *</legend>
                                <div>
                                    <label className="block font-semibold text-gray-700 mb-3">Organization Name *</label>
                                    <input name="NameofOrganization" value={formData.NameofOrganization} onChange={handleChange}
                                        className="w-full border rounded-xl py-3 px-4 focus:ring-2 focus:ring-yellow-500" required />
                                </div>
                            </fieldset>
                        )}

                        {/* DECLARATION */}
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl border-4 border-dashed border-orange-300">
                            <label className="flex items-start gap-4 p-6 bg-white rounded-xl border-2 border-orange-200">
                                <input type="checkbox" checked={formData.Declaration}
                                    onChange={(e) => setFormData(prev => ({ ...prev, Declaration: e.target.checked }))}
                                    className="w-6 h-6 accent-orange-600 mt-1 flex-shrink-0" required />
                                <span className="text-lg text-gray-700">
                                    I declare all information is true.{" "}
                                    <span className="text-orange-700 font-bold underline cursor-pointer hover:text-orange-800"
                                        onClick={() => setSeedsterms(true)}>Terms & Conditions</span>
                                </span>
                            </label>
                        </div>

                        {showseedsterms && <SeedScalingTerms />}

                        <div className="pt-12 space-y-4">
                            <button type="submit" disabled={loading || acceleratorState.status === "loading" || breederState.isLoading}
                                className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white py-6 px-8 rounded-2xl font-bold text-xl shadow-2xl transition-all disabled:opacity-50">
                                {loading ? "⏳ Creating..." : `🚀 Create Account & ${registerAs} Profile`}
                            </button>
                            <button type="button" onClick={resetForm}
                                className="w-full border-2 border-gray-300 text-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-50">
                                ← Change Role
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <SuccessModal show={showModal} onClose={resetForm} userType={registerAs.charAt(0).toUpperCase() + registerAs.slice(1)} />
        </>
    );
}

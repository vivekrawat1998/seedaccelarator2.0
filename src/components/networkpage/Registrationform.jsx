import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitAccelartorRequest } from "../../redux/membership/Accelaratorslice";
import { submitBreederRequest } from "../../redux/membership/Breederslice";
import { updateUserRole } from "../../api/auth"; // ✅ NEW IMPORT

const orgTypes = [
    "FPO/FPC", "NGO", "ICAR Institutes/Name", "Universities/Name",
    "National Seed Organisation", "State Seed Organisation",
    "State Seed Certification Agency", "State department of Agriculture",
    "Private seed company", "Individual farmers", "Other",
];

const participationTypes = [
    "Seed multiplication", "Research Collaboration", "Knowledge Sharing",
    "Trainings", "Other",
];

const SuccessModal = ({ show, onClose, type }) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-sm w-full flex flex-col items-center">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-green-700 mb-4">Success!</h3>
                <p className="mb-6 text-center text-gray-700">
                    Successfully registered as {type === 'member' ? 'Accelerator' : 'Breeder'}!
                </p>
                <p className="text-sm text-gray-500 mb-6 text-center">
                    Your request has been submitted. Check Dashboard for status.
                </p>
                <button
                    onClick={onClose}
                    className="bg-green-700 px-8 py-3 rounded-xl text-white font-semibold hover:bg-green-600 transition-all shadow-lg w-full"
                >
                    Go to Dashboard →
                </button>
            </div>
        </div>
    );
};

const RegistrationForm = ({ onRegisterAsChange }) => {
    const dispatch = useDispatch();
    const [registerAs, setRegisterAs] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ✅ FIXED: Proper array state for multi-select
    const [formData, setFormData] = useState({
        name: "",
        Designation: "",
        Mobilenumber: "",
        email: "",
        NameofOrganization: "",
        TypeofOrganization: [], // ✅ ARRAY
        RegistrationNumber: "",
        State: "",
        PurposeofParticipation: [], // ✅ ARRAY
        Declaration: false
    });

    const accelLoading = useSelector((state) => state.accelartor?.status === "loading");
    const breederLoading = useSelector((state) => state.breeder?.isLoading);

    // ✅ FIXED: Toggle array values
    const toggleArrayValue = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter(v => v !== value)
                : [...prev[field], value]
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError("");
    };

    const handleRegisterAsChange = (e) => {
        const value = e.target.value;
        setRegisterAs(value);
        if (onRegisterAsChange) onRegisterAsChange(value);
        // Reset form when changing type
        setFormData({
            name: "", Designation: "", Mobilenumber: "", email: "",
            NameofOrganization: "", TypeofOrganization: [], RegistrationNumber: "",
            State: "", PurposeofParticipation: [], Declaration: false
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();




        try {
            // ✅ STEP 1: Update userType in Strapi User

            console.log("🔥 Updating userType to:", registerAs);
            await updateUserRole(registerAs === "member" ? "accelerator" : "breeder");

            // ✅ STEP 2: Submit membership request
            if (registerAs === "member") {
                await dispatch(submitAccelartorRequest({
                    data: {
                        name: formData.name,
                        Designation: formData.Designation,
                        Mobilenumber: formData.Mobilenumber,
                        email: formData.email,
                        NameofOrganization: formData.NameofOrganization,
                        TypeofOrganization: formData.TypeofOrganization,
                        RegistrationNumber: formData.RegistrationNumber,
                        State: formData.State,
                        PurposeofParticipation: formData.PurposeofParticipation,
                        Declaration: true
                    }
                })).unwrap();
            } else {
                await dispatch(submitBreederRequest({
                    data: {
                        name: formData.name,
                        designation: formData.Designation,
                        organization: formData.NameofOrganization,
                        phone: formData.Mobilenumber,
                        email: formData.email,
                        Declaration: true
                    }
                })).unwrap();
            }

            setShowModal(true);
        } catch (err) {
            console.error("Registration error:", err);
            setError(err?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
        // Validation
        if (!formData.name?.trim() || !formData.email?.trim() || !formData.Mobilenumber?.trim() ||
            !formData.NameofOrganization?.trim() || !formData.Declaration) {
            setError("Please fill all required fields");
            return;
        }

        if (registerAs === "member" && (
            formData.TypeofOrganization.length === 0 ||
            formData.PurposeofParticipation.length === 0
        )) {
            setError("Please select organization type and purpose");
            return;
        }

        setLoading(true);
        setError("");

    };

    return (
        <>
            <section className="max-w-4xl mx-auto my-14 bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-4">
                        SAN Member Registration (Free)
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Complete your profile to join the network
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border-2 border-red-200 text-red-700 p-6 rounded-2xl mb-8 text-center">
                        {error}
                    </div>
                )}

                <form className="space-y-8" onSubmit={handleSubmit}>
                    {/* 1. APPLICANT INFO */}
                    <fieldset className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border-2 border-blue-200">
                        <legend className="text-2xl font-bold text-blue-700 mb-6">👤 Applicant Info</legend>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">Full Name *</label>
                                <input
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full border-2 border-blue-300 rounded-xl py-4 px-4 focus:ring-2 focus:ring-blue-500 bg-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">Email *</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full border-2 border-blue-300 rounded-xl py-4 px-4 focus:ring-2 focus:ring-blue-500 bg-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">Mobile Number *</label>
                                <input
                                    name="Mobilenumber"
                                    type="tel"
                                    value={formData.Mobilenumber}
                                    onChange={handleInputChange}
                                    className="w-full border-2 border-blue-300 rounded-xl py-4 px-4 focus:ring-2 focus:ring-blue-500 bg-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">Designation</label>
                                <input
                                    name="Designation"
                                    type="text"
                                    value={formData.Designation}
                                    onChange={handleInputChange}
                                    className="w-full border-2 border-blue-300 rounded-xl py-4 px-4 focus:ring-2 focus:ring-blue-500 bg-white"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block font-semibold text-gray-700 mb-2">Register As *</label>
                                <select
                                    value={registerAs}
                                    onChange={handleRegisterAsChange}
                                    className="w-full border-2 border-blue-300 rounded-xl py-4 px-4 focus:ring-2 focus:ring-blue-500 bg-white"
                                    required
                                >
                                    <option value="" disabled>Select membership type</option>
                                    <option value="member">🚀 Accelerator</option>
                                    <option value="breeder">🌱 Breeder</option>
                                </select>
                            </div>
                        </div>
                    </fieldset>

                    {/* 2. ORGANIZATION INFO */}
                    {registerAs && (
                        <fieldset className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200">
                            <legend className="text-2xl font-bold text-green-700 mb-6">
                                🏢 {registerAs === "member" ? "Organization Details" : "Organization"}
                            </legend>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block font-semibold text-gray-700 mb-2">Organization Name *</label>
                                    <input
                                        name="NameofOrganization"
                                        type="text"
                                        value={formData.NameofOrganization}
                                        onChange={handleInputChange}
                                        className="w-full border-2 border-green-300 rounded-xl py-4 px-4 focus:ring-2 focus:ring-green-500 bg-white"
                                        required
                                    />
                                </div>

                                {registerAs === "member" && (
                                    <>
                                        <div className="md:col-span-2">
                                            <label className="block font-semibold text-gray-700 mb-2">Type of Organization * (Multi-select)</label>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-4 border-2 border-green-200 rounded-2xl bg-white">
                                                {orgTypes.map((type) => (
                                                    <label key={type} className="flex items-center p-3 hover:bg-green-50 rounded-xl cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            value={type}
                                                            checked={formData.TypeofOrganization.includes(type)}
                                                            onChange={() => toggleArrayValue("TypeofOrganization", type)}
                                                            className="w-5 h-5 accent-green-600 mr-3"
                                                        />
                                                        <span className="text-sm">{type}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block font-semibold text-gray-700 mb-2">Registration Number</label>
                                            <input
                                                name="RegistrationNumber"
                                                type="text"
                                                value={formData.RegistrationNumber}
                                                onChange={handleInputChange}
                                                className="w-full border-2 border-green-300 rounded-xl py-4 px-4 bg-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-semibold text-gray-700 mb-2">State / District</label>
                                            <input
                                                name="State"
                                                type="text"
                                                value={formData.State}
                                                onChange={handleInputChange}
                                                className="w-full border-2 border-green-300 rounded-xl py-4 px-4 bg-white"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block font-semibold text-gray-700 mb-2">Purpose of Participation * (Multi-select)</label>
                                            <div className="grid grid-cols-2 gap-3 p-4 border-2 border-green-200 rounded-2xl bg-white">
                                                {participationTypes.map((type) => (
                                                    <label key={type} className="flex items-center p-3 hover:bg-green-50 rounded-xl cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            value={type}
                                                            checked={formData.PurposeofParticipation.includes(type)}
                                                            onChange={() => toggleArrayValue("PurposeofParticipation", type)}
                                                            className="w-5 h-5 accent-green-600 mr-3"
                                                        />
                                                        <span className="text-sm">{type}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </fieldset>
                    )}

                    {/* 3. DECLARATION */}
                    {registerAs && (
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl border-4 border-dashed border-orange-300">
                            <label className="flex items-center gap-4 p-6 bg-white rounded-xl border-2 border-orange-200 cursor-pointer hover:border-orange-300">
                                <input
                                    type="checkbox"
                                    checked={formData.Declaration}
                                    onChange={(e) => setFormData(prev => ({ ...prev, Declaration: e.target.checked }))}
                                    className="w-6 h-6 accent-orange-600 flex-shrink-0"
                                    required
                                />
                                <span className="text-lg text-gray-700">
                                    I hereby declare that all information provided is true and accurate to the best of my knowledge.
                                </span>
                            </label>
                        </div>
                    )}

                    {/* SUBMIT BUTTON */}
                    {registerAs && (
                        <div className="space-y-4 pt-8">
                            <button
                                type="submit"
                                disabled={loading || accelLoading || breederLoading}
                                className="w-full bg-gradient-to-r from-emerald-600 to-green-700 text-white font-bold py-6 px-8 rounded-2xl text-xl shadow-2xl hover:from-emerald-700 hover:to-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading || accelLoading || breederLoading
                                    ? "⏳ Processing Registration..."
                                    : `🚀 Complete ${registerAs === "member" ? "Accelerator" : "Breeder"} Registration`
                                }
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setRegisterAs("");
                                    setFormData({
                                        name: "", Designation: "", Mobilenumber: "", email: "",
                                        NameofOrganization: "", TypeofOrganization: [], RegistrationNumber: "",
                                        State: "", PurposeofParticipation: [], Declaration: false
                                    });
                                }}
                                className="w-full border-2 border-gray-300 text-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all"
                            >
                                ← Change Membership Type
                            </button>
                        </div>
                    )}
                </form>
            </section>

            <SuccessModal
                show={showModal}
                type={registerAs}
                onClose={() => {
                    setShowModal(false);
                    window.location.href = "/dashboard"; // Redirect to dashboard
                }}
            />
        </>
    );
};

export default RegistrationForm;

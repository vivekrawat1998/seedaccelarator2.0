import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitAccelartorRequest } from "../../redux/membership/Accelaratorslice";
import { submitBreederRequest } from "../../redux/membership/Breederslice";

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
                <h3 className="text-xl font-bold text-green-700 mb-4">Success!</h3>
                <p className="mb-6 text-center">Successfully registered as {type === 'member' ? 'Accelerator' : 'Breeder'}!</p>
                <button
                    onClick={onClose}
                    className="bg-green-700 px-6 py-2 rounded-lg text-white font-semibold hover:bg-green-600 transition"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

const RegistrationForm = ({ onRegisterAsChange }) => {
    const dispatch = useDispatch();

    // Select loading states from Redux
    const accelLoading = useSelector((state) => state.accelartor?.loading);
    const breederLoading = useSelector((state) => state.breeder?.isLoading);

    const [registerAs, setRegisterAs] = useState("");
    const [showModal, setShowModal] = useState(false);

    // Unified state to match Strapi field names exactly
    const [formData, setFormData] = useState({
        name: "",
        Designation: "",
        Mobilenumber: "", 
        email: "",
        NameofOrganization: "", 
        TypeofOrganization: "",
        RegistrationNumber: "",
        State: "",
        PurposeofParticipation: "",
        Declaration: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" || type === "radio" ? checked : value
        }));
    };

    const handleRegisterAsChange = (e) => {
        const value = e.target.value;
        setRegisterAs(value);
        if (onRegisterAsChange) onRegisterAsChange(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (registerAs === "member") {
            // Logic for Accelerator Request
            const result = await dispatch(submitAccelartorRequest({
                ...formData,
                Mobilenumber: Number(formData.Mobilenumber),
                RegistrationNumber: Number(formData.RegistrationNumber)
            }));
            if (!result.error) setShowModal(true);

        } else if (registerAs === "breeder") {
            // Logic for Breeder Request (maps specific fields to Breeder schema)
            const breederData = {
                name: formData.name,
                Designation: formData.Designation,
                Organization: formData.NameofOrganization,
                email: formData.email,
                phone: Number(formData.Mobilenumber),
                Declaration: formData.Declaration
            };
            const result = await dispatch(submitBreederRequest(breederData));
            if (!result.error) setShowModal(true);
        }
    };

    return (
        <>
            <section className="max-w-7xl mx-auto my-14 bg-white rounded-3xl md:p-8 p-3">
                <h2 className="text-3xl font-extrabold text-green-800 mb-10 text-center">
                    SAN Member Registration (Free)
                </h2>
                <form className="space-y-8" onSubmit={handleSubmit}>
                    <fieldset className="space-y-5">
                        <legend className="text-xl font-bold text-green-600 mb-2">1. Applicant Info</legend>
                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Full Name</label>
                            <input name="name" type="text" value={formData.name} onChange={handleInputChange} className="w-full border border-green-200 rounded-lg py-2 px-3 bg-slate-50" required />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Designation</label>
                            <input name="Designation" type="text" value={formData.Designation} onChange={handleInputChange} className="w-full border border-green-200 rounded-lg py-2 px-3 bg-slate-50" />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Mobile Number</label>
                            <input name="Mobilenumber" type="tel" value={formData.Mobilenumber} onChange={handleInputChange} className="w-full border border-green-200 rounded-lg py-2 px-3 bg-slate-50" required />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Email Address</label>
                            <input name="email" type="email" value={formData.email} onChange={handleInputChange} className="w-full border border-green-200 rounded-lg py-2 px-3 bg-slate-50" required />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Register As</label>
                            <select
                                className="w-full border border-green-200 rounded-lg py-2 px-3 bg-slate-50"
                                value={registerAs}
                                onChange={handleRegisterAsChange}
                                required
                            >
                                <option value="" disabled>Select an option</option>
                                <option value="member">Accelerator</option>
                                <option value="breeder">Breeder</option>
                            </select>
                        </div>
                    </fieldset>

                    {/* Common fields for both, but specifically structured for Accelerator UI */}
                    {registerAs && (
                        <>
                            <fieldset className="space-y-5">
                                <legend className="text-xl font-bold text-green-600 mb-2">2. Organization Info</legend>
                                <div>
                                    <label className="block font-medium text-gray-700 mb-1">Name of Organization / Group</label>
                                    <input name="NameofOrganization" type="text" value={formData.NameofOrganization} onChange={handleInputChange} className="w-full border border-green-200 rounded-lg py-2 px-3 bg-slate-50" required />
                                </div>

                                {registerAs === "member" && (
                                    <>
                                        <div>
                                            <label className="block font-medium text-gray-700 mb-1">Type of Organization</label>
                                            <select name="TypeofOrganization" value={formData.TypeofOrganization} onChange={handleInputChange} className="w-full border border-green-200 rounded-lg py-2 px-3 bg-slate-50">
                                                <option value="">Select Type</option>
                                                {orgTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block font-medium text-gray-700 mb-1">Registration Number</label>
                                            <input name="RegistrationNumber" type="text" value={formData.RegistrationNumber} onChange={handleInputChange} className="w-full border border-green-200 rounded-lg py-2 px-3 bg-slate-50" />
                                        </div>
                                        <div>
                                            <label className="block font-medium text-gray-700 mb-1">State / District</label>
                                            <input name="State" type="text" value={formData.State} onChange={handleInputChange} className="w-full border border-green-200 rounded-lg py-2 px-3 bg-slate-50" />
                                        </div>
                                        <div>
                                            <label className="block font-medium text-gray-700 mb-1">Purpose of Participation</label>
                                            <select name="PurposeofParticipation" value={formData.PurposeofParticipation} onChange={handleInputChange} className="w-full border border-green-200 rounded-lg py-2 px-3 bg-slate-50">
                                                <option value="">Select Purpose</option>
                                                {participationTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                            </select>
                                        </div>
                                    </>
                                )}
                            </fieldset>

                            <fieldset className="space-y-5 border-t border-green-100 pt-5">
                                <legend className="text-xl font-bold text-green-600 mb-2">Declaration</legend>
                                <div className="flex items-center gap-6">
                                    <label className="flex items-center space-x-2 text-sm">
                                        <input type="radio" name="Declaration" checked={formData.Declaration === true} onChange={() => setFormData({ ...formData, Declaration: true })} className="accent-green-600" required />
                                        <span>Yes</span>
                                    </label>
                                    <label className="flex items-center space-x-2 text-sm">
                                        <input type="radio" name="Declaration" checked={formData.Declaration === false} onChange={() => setFormData({ ...formData, Declaration: false })} className="accent-green-600" />
                                        <span>No</span>
                                    </label>
                                </div>
                                <label className="flex items-center space-x-2 text-sm">
                                    <input type="checkbox" required className="accent-green-600" />
                                    <span>I hereby declare that the information provided is true...</span>
                                </label>
                            </fieldset>

                            <button
                                type="submit"
                                disabled={accelLoading || breederLoading}
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold py-3 rounded-xl mt-2 shadow-lg hover:from-emerald-500 hover:to-green-600 transition disabled:opacity-50"
                            >
                                {accelLoading || breederLoading ? "Processing..." : "Register Now"}
                            </button>
                        </>
                    )}
                </form>
            </section>
            <SuccessModal show={showModal} type={registerAs} onClose={() => setShowModal(false)} />
        </>
    );
};

export default RegistrationForm;
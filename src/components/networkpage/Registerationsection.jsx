import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SeedScalingTerms from "../../components/networkpage/Seedterms";

// Redux thunks
import { submitAccelartorRequest } from "../../redux/membership/Accelaratorslice";
import { submitBreederRequest } from "../../redux/membership/Breederslice";

const orgTypes = [
    "FPO/FPC",
    "NGO",
    "ICAR Institutes/Name",
    "Universities/Name",
    "National Seed Organisation",
    "State Seed Organisation",
    "State Seed Certification Agency",
    "State department of Agriculture",
    "Private seed company",
    "Individual farmers",
    "Other",
];

const participationTypes = [
    "Seed multiplication",
    "Research Collaboration",
    "Knowledge Sharing",
    "Trainings",
    "Other",
];

const SuccessModal = ({ show, onClose, userType }) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-sm w-full flex flex-col items-center">
                <h3 className="text-xl font-bold text-green-700 mb-4">Success!</h3>
                <p className="mb-6 text-center">
                    Successfully registered as {userType}!
                </p>
                <button
                    onClick={onClose}
                    className="bg-green-700 px-6 py-2 rounded-lg text-white font-semibold hover:bg-green-600 shadow active:scale-95 transition"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

const RegistrationPage = () => {
    const dispatch = useDispatch();
    const acceleratorState =
        useSelector((state) => state.accelartor) || { status: "idle", error: null };
    const breederState =
        useSelector((state) => state.breeder) || { isLoading: false, isError: false };

    const [registerAs, setRegisterAs] = useState("none");
    const [showModal, setShowModal] = useState(false);
    const [showseedsterms, setSeedsterms] = useState(false);
    const [acceleratorForm, setAcceleratorForm] = useState({
        name: "",
        Designation: "",
        Mobilenumber: "",
        email: "",
        NameofOrganization: "",
        TypeofOrganization: "",
        RegistrationNumber: "",
        State: "",
        PurposeofParticipation: "",
        Declaration: false,
    });

    const handleAcceleratorChange = (e) => {
        setAcceleratorForm({ ...acceleratorForm, [e.target.name]: e.target.value });
    };

    const handleAcceleratorSubmit = (e) => {
        e.preventDefault();

        if (!acceleratorForm.Declaration) {
            alert("Please accept terms and conditions");
            return;
        }

        const payload = {
            name: acceleratorForm.name,
            Designation: acceleratorForm.Designation,
            Mobilenumber: acceleratorForm.Mobilenumber, // string
            email: acceleratorForm.email,
            NameofOrganization: acceleratorForm.NameofOrganization,
            TypeofOrganization: acceleratorForm.TypeofOrganization,
            RegistrationNumber: acceleratorForm.RegistrationNumber,
            State: acceleratorForm.State,
            PurposeofParticipation: acceleratorForm.PurposeofParticipation,
            Declaration: acceleratorForm.Declaration,
        };

        dispatch(submitAccelartorRequest(payload))
            .unwrap()
            .then(() => setShowModal(true))
            .catch((error) => alert(error));
    };

    // -------------------------
    // BREEDER FORM (MATCHES STRAPI)
    // -------------------------
    const [breederFormData, setBreederFormData] = useState({
        name: "",
        designation: "",
        organization: "",
        email: "",
        phone: "",
    });

    const handleBreederChange = (e) => {
        setBreederFormData({ ...breederFormData, [e.target.name]: e.target.value });
    };

    const handleBreederSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name: breederFormData.name,
            Designation: breederFormData.designation,
            Organization: breederFormData.organization,
            email: breederFormData.email,
            phone: breederFormData.phone, // store as string
            Declaration: true,
        };

        dispatch(submitBreederRequest(payload))
            .unwrap()
            .then(() => setShowModal(true))
            .catch((error) => alert(error));
    };

    // Reset
    const resetRegistration = () => {
        setRegisterAs("none");
        setShowModal(false);
        setSeedsterms(false);
        setAcceleratorForm({
            name: "",
            Designation: "",
            Mobilenumber: "",
            email: "",
            NameofOrganization: "",
            TypeofOrganization: "",
            RegistrationNumber: "",
            State: "",
            PurposeofParticipation: "",
            Declaration: false,
        });
        setBreederFormData({
            name: "",
            designation: "",
            organization: "",
            email: "",
            phone: "",
        });
    };

    return (
        <>
            {registerAs === "none" ? (
                <div className="max-w-md mx-auto my-20 text-center">
                    <h2 className="text-3xl font-extrabold text-green-800 mb-8">
                        Register as
                    </h2>
                    <button
                        className="bg-green-700 text-white px-8 py-3 rounded-xl mr-4 shadow"
                        onClick={() => setRegisterAs("accelerator")}
                    >
                        Accelerator
                    </button>
                    <button
                        className="bg-yellow-400 text-white px-8 py-3 rounded-xl shadow"
                        onClick={() => setRegisterAs("breeder")}
                    >
                        Breeder
                    </button>
                </div>
            ) : registerAs === "accelerator" ? (
                <section className="max-w-5xl mx-auto my-14 bg-white rounded-3xl p-8 shadow">
                    <h2 className="text-3xl font-extrabold text-green-800 mb-10 text-center">
                        Accelerator Registration
                    </h2>

                    <form className="space-y-8" onSubmit={handleAcceleratorSubmit}>
                        {/* Applicant Info */}
                        <fieldset className="space-y-4">
                            <legend className="text-xl font-bold text-green-600">
                                Applicant Info
                            </legend>

                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={acceleratorForm.name}
                                onChange={handleAcceleratorChange}
                                className="w-full border rounded-lg p-2"
                                required
                            />

                            <input
                                type="text"
                                name="Designation"
                                placeholder="Designation"
                                value={acceleratorForm.Designation}
                                onChange={handleAcceleratorChange}
                                className="w-full border rounded-lg p-2"
                                required
                            />

                            <input
                                type="tel"
                                name="Mobilenumber"
                                placeholder="Mobile Number"
                                value={acceleratorForm.Mobilenumber}
                                onChange={handleAcceleratorChange}
                                className="w-full border rounded-lg p-2"
                                required
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={acceleratorForm.email}
                                onChange={handleAcceleratorChange}
                                className="w-full border rounded-lg p-2"
                                required
                            />
                        </fieldset>

                        {/* Organization Info */}
                        <fieldset className="space-y-4">
                            <legend className="text-xl font-bold text-green-600">
                                Organization Info
                            </legend>

                            <input
                                type="text"
                                name="NameofOrganization"
                                placeholder="Name of Organization"
                                value={acceleratorForm.NameofOrganization}
                                onChange={handleAcceleratorChange}
                                className="w-full border rounded-lg p-2"
                                required
                            />

                            <select
                                name="TypeofOrganization"
                                value={acceleratorForm.TypeofOrganization}
                                onChange={handleAcceleratorChange}
                                className="w-full border rounded-lg p-2"
                                required
                            >
                                <option value="">Choose here</option>
                                {orgTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="text"
                                name="RegistrationNumber"
                                placeholder="Registration Number"
                                value={acceleratorForm.RegistrationNumber}
                                onChange={handleAcceleratorChange}
                                className="w-full border rounded-lg p-2"
                            />

                            <input
                                type="text"
                                name="State"
                                placeholder="State"
                                value={acceleratorForm.State}
                                onChange={handleAcceleratorChange}
                                className="w-full border rounded-lg p-2"
                                required
                            />
                        </fieldset>

                        {/* Participation */}
                        <fieldset className="space-y-4">
                            <legend className="text-xl font-bold text-green-600">
                                Participation
                            </legend>

                            <select
                                name="PurposeofParticipation"
                                value={acceleratorForm.PurposeofParticipation}
                                onChange={handleAcceleratorChange}
                                className="w-full border rounded-lg p-2"
                                required
                            >
                                <option value="">Choose here</option>
                                {participationTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </fieldset>

                        {/* Declaration */}
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={acceleratorForm.Declaration}
                                onChange={(e) =>
                                    setAcceleratorForm({
                                        ...acceleratorForm,
                                        Declaration: e.target.checked,
                                    })
                                }
                                required
                            />
                            I agree to terms and conditions
                        </label>

                        {showseedsterms && <SeedScalingTerms />}

                        <button
                            type="submit"
                            disabled={acceleratorState.status === "loading"}
                            className="w-full bg-green-700 text-white py-3 rounded-xl"
                        >
                            {acceleratorState.status === "loading"
                                ? "Submitting..."
                                : "Register"}
                        </button>

                        {acceleratorState.error && (
                            <p className="text-red-500 text-sm text-center">
                                {acceleratorState.error}
                            </p>
                        )}

                        <button
                            type="button"
                            onClick={resetRegistration}
                            className="w-full mt-4 border border-green-600 text-green-700 rounded-xl py-2"
                        >
                            Back
                        </button>
                    </form>

                    <SuccessModal
                        show={showModal}
                        onClose={() => setShowModal(false)}
                        userType="accelerator"
                    />
                </section>
            ) : (
                <section className="max-w-5xl mx-auto my-20 bg-white rounded-3xl p-8 shadow">
                    <h2 className="text-2xl font-extrabold text-green-800 mb-6 text-center">
                        Register as Breeder
                    </h2>

                    <form className="space-y-6" onSubmit={handleBreederSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={breederFormData.name}
                            onChange={handleBreederChange}
                            className="w-full border rounded-md p-2"
                            required
                        />

                        <input
                            type="text"
                            name="designation"
                            placeholder="Designation"
                            value={breederFormData.designation}
                            onChange={handleBreederChange}
                            className="w-full border rounded-md p-2"
                            required
                        />

                        <input
                            type="text"
                            name="organization"
                            placeholder="Organization"
                            value={breederFormData.organization}
                            onChange={handleBreederChange}
                            className="w-full border rounded-md p-2"
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={breederFormData.email}
                            onChange={handleBreederChange}
                            className="w-full border rounded-md p-2"
                            required
                        />

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            value={breederFormData.phone}
                            onChange={handleBreederChange}
                            className="w-full border rounded-md p-2"
                            required
                        />

                        <button
                            type="submit"
                            disabled={breederState.isLoading}
                            className="w-full bg-green-700 text-white py-3 rounded-xl"
                        >
                            {breederState.isLoading ? "Submitting..." : "Register"}
                        </button>

                        {breederState.isError && (
                            <p className="text-red-500 text-sm text-center">
                                {breederState.errorMessage}
                            </p>
                        )}

                        <button
                            type="button"
                            onClick={resetRegistration}
                            className="w-full mt-4 border border-green-600 text-green-700 rounded-xl py-2"
                        >
                            Back
                        </button>
                    </form>

                    <SuccessModal
                        show={showModal}
                        onClose={() => setShowModal(false)}
                        userType="breeder"
                    />
                </section>
            )}
        </>
    );
};

export default RegistrationPage;

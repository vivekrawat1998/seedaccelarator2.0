import React, { useMemo, useState } from "react";

const emptyVariety = {
    VarietyName: "",
    Typeofseedrequired: "",
    quantityinkg: "",
    PurposeMode: "",
};

const seedTypeOptions = [
    { label: "Breeder Seed", value: "Breederseed" },
    { label: "Foundation Seed", value: "Foundationseed" },
    { label: "Certified Seed", value: "CertifiedSeed" },
    { label: "Others", value: "others" },
];

// Map stored enum values back to friendly labels for display
const seedTypeLabelMap = seedTypeOptions.reduce((acc, opt) => {
    acc[opt.value] = opt.label;
    return acc;
}, {});

const getSeedTypeLabel = (value) => seedTypeLabelMap[value] || value || "N/A";

const InfoField = ({ label, value }) => (
    <div>
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">
            {label}
        </p>
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900">
            {value || "N/A"}
        </div>
    </div>
);

const VarietyDetailsModal = ({ open, onClose, variety }) => {
    if (!open || !variety) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 flex items-center justify-between border-b bg-white px-6 py-4 rounded-t-2xl">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">
                            {variety.VarietyName || "Variety Details"}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            View complete requested variety information
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-10 w-10 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        aria-label="Close modal"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoField label="Variety Name" value={variety.VarietyName} />
                    <InfoField label="Type of Seed Required" value={getSeedTypeLabel(variety.Typeofseedrequired)} />
                    <InfoField label="Quantity (kg)" value={variety.quantityinkg} />
                    <div className="md:col-span-2">
                        <InfoField label="Purpose / Mode of Use" value={variety.PurposeMode} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const InputField = ({ label, required = false, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            {...props}
            className={`w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${props.className || ""}`}
        />
    </div>
);

const TextareaField = ({ label, required = false, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
            {...props}
            className={`w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${props.className || ""}`}
        />
    </div>
);

const AcceleratorVarietiesSection = ({ acceleratorData, refreshAcceleratorByDocumentId, api }) => {
    const [savingVarieties, setSavingVarieties] = useState(false);
    const [selectedVariety, setSelectedVariety] = useState(null);
    const [showVarietyModal, setShowVarietyModal] = useState(false);
    const [newVariety, setNewVariety] = useState({ ...emptyVariety });

    const savedVarieties = useMemo(() => {
        const raw = acceleratorData?.[0]?.nominatedvariety?.accelaratorvariety;
        if (Array.isArray(raw)) return raw;
        if (raw) return [raw];
        return [];
    }, [acceleratorData]);

    const openVarietyModal = (item) => {
        setSelectedVariety(item);
        setShowVarietyModal(true);
    };

    const closeVarietyModal = () => {
        setSelectedVariety(null);
        setShowVarietyModal(false);
    };

    const handleChange = (field, value) => {
        setNewVariety((prev) => ({ ...prev, [field]: value }));
    };

    const resetForm = () => {
        setNewVariety({ ...emptyVariety });
    };

    const handleSave = async () => {
        if (!acceleratorData?.length) {
            alert("No accelerator data found");
            return;
        }

        const mandatoryFields = [
            { key: "VarietyName", label: "Variety Name" },
            { key: "Typeofseedrequired", label: "Type of Seed Required" },
            { key: "quantityinkg", label: "Quantity (kg)" },
            { key: "PurposeMode", label: "Purpose / Mode of Use" },
        ];

        for (const field of mandatoryFields) {
            const val = newVariety[field.key];
            if (val === null || val === undefined || String(val).trim() === "") {
                alert(`${field.label} is required`);
                return;
            }
        }

        try {
            setSavingVarieties(true);

            const documentId = acceleratorData[0].documentId;
            const existingRaw = acceleratorData[0]?.nominatedvariety?.accelaratorvariety || [];

            const normalizeNumber = (value) => {
                if (value === "" || value === null || value === undefined) return null;
                const num = Number(value);
                return Number.isNaN(num) ? null : num;
            };

            const existingVarieties = existingRaw.map((item) => ({
                VarietyName: item?.VarietyName || "",
                Typeofseedrequired: item?.Typeofseedrequired || "",
                quantityinkg: normalizeNumber(item?.quantityinkg),
                PurposeMode: item?.PurposeMode || "",
            }));

            const cleanedVariety = {
                VarietyName: newVariety.VarietyName?.trim() || "",
                Typeofseedrequired: newVariety.Typeofseedrequired || "",
                quantityinkg: normalizeNumber(newVariety.quantityinkg),
                PurposeMode: newVariety.PurposeMode?.trim() || "",
            };

            const payload = {
                data: {
                    nominatedvariety: {
                        accelaratorvariety: [...existingVarieties, cleanedVariety],
                    },
                },
            };

            await api.put(`/accelartor-requests/${documentId}`, payload);
            await refreshAcceleratorByDocumentId(documentId);

            setNewVariety({ ...emptyVariety });
            alert("Variety nominated successfully");
        } catch (error) {
            console.error("SAVE ERROR =>", error);
            console.error("STATUS =>", error?.response?.status);
            console.error("ERROR DATA =>", error?.response?.data);
            alert(
                error?.response?.data?.error?.message ||
                "Save failed. Check console for details."
            );
        } finally {
            setSavingVarieties(false);
        }
    };

    return (
        <>
            <div className="bg-white p-6 rounded-2xl shadow">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            🌱 Requested Varieties
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Click any variety to view full details
                        </p>
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                        Total: {savedVarieties.length}
                    </div>
                </div>

                {/* TABLE */}
                <div className="mb-8">
                    {savedVarieties.length > 0 ? (
                        <div className="overflow-hidden rounded-2xl border border-gray-200">
                            <div className="hidden md:grid grid-cols-4 bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700">
                                <p>Variety Name</p>
                                <p>Seed Type</p>
                                <p>Quantity (kg)</p>
                                <p>Purpose / Mode</p>
                            </div>

                            <div className="divide-y divide-gray-200">
                                {savedVarieties.map((item, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => openVarietyModal(item)}
                                        className="w-full text-left px-4 py-4 hover:bg-blue-50 transition"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
                                            <div>
                                                <p className="text-xs text-gray-500 md:hidden">Variety Name</p>
                                                <p className="font-semibold text-gray-900">
                                                    {item.VarietyName || "N/A"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 md:hidden">Seed Type</p>
                                                <p className="text-gray-700 truncate">
                                                    {getSeedTypeLabel(item.Typeofseedrequired)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 md:hidden">Quantity (kg)</p>
                                                <p className="text-gray-700">
                                                    {item.quantityinkg ?? "N/A"}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-500 md:hidden">Purpose / Mode</p>
                                                <p className="text-gray-700 truncate">
                                                    {item.PurposeMode || "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
                            <p className="text-lg font-semibold text-gray-700">
                                No requested varieties yet
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Add your first variety using the form below
                            </p>
                        </div>
                    )}
                </div>

                {/* FORM */}
                <div className="border-t border-gray-200 pt-8">
                    <div className="max-w-4xl">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            Request a Variety
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Fill in the details below to request a variety. All fields marked{" "}
                            <span className="text-red-500">*</span> are required.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Variety Name — full width */}
                            <div className="md:col-span-2">
                                <InputField
                                    label="Variety Name"
                                    required
                                    type="text"
                                    placeholder="Enter variety name"
                                    value={newVariety.VarietyName}
                                    onChange={(e) => handleChange("VarietyName", e.target.value)}
                                />
                            </div>

                            {/* Type of Seed Required — radio pills */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Type of Seed Required <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {seedTypeOptions.map((opt) => (
                                        <label
                                            key={opt.value}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all text-sm ${newVariety.Typeofseedrequired === opt.value
                                                ? "bg-blue-50 border-blue-400 font-medium text-blue-800"
                                                : "border-gray-200 hover:bg-gray-50 text-gray-700"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="Typeofseedrequired"
                                                value={opt.value}
                                                checked={newVariety.Typeofseedrequired === opt.value}
                                                onChange={() => handleChange("Typeofseedrequired", opt.value)}
                                                className="accent-blue-600 w-4 h-4"
                                            />
                                            {opt.label}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <InputField
                                label="Quantity (kg)"
                                required
                                type="number"
                                placeholder="Enter quantity in kg"
                                value={newVariety.quantityinkg}
                                onChange={(e) => handleChange("quantityinkg", e.target.value)}
                            />

                            {/* Purpose / Mode of Use */}
                            <div className="md:col-span-2">
                                <TextareaField
                                    label="Purpose / Mode of Scaling"
                                    required
                                    placeholder="Describe the purpose or mode of scaling for this variety"
                                    rows={4}
                                    value={newVariety.PurposeMode}
                                    onChange={(e) => handleChange("PurposeMode", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={savingVarieties}
                                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                {savingVarieties ? "Saving..." : "Request Variety"}
                            </button>

                            <button
                                type="button"
                                onClick={resetForm}
                                className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <VarietyDetailsModal
                open={showVarietyModal}
                onClose={closeVarietyModal}
                variety={selectedVariety}
            />
        </>
    );
};

export default AcceleratorVarietiesSection;
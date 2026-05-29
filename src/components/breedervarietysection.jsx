import React, { useMemo, useState } from "react";

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
            <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 flex items-center justify-between border-b bg-white px-6 py-4 rounded-t-2xl">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">
                            {variety.variety || "Variety Details"}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            View complete nominated variety information
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
                    <InfoField label="Variety" value={variety.variety} />
                    <InfoField label="Duration (days after sowing)" value={variety.Duration} />
                    <InfoField label="Ecosystem" value={variety.Ecosystem} />
                    <InfoField label="Market Segment" value={variety.MarketSegment} />
                    <InfoField label="Grain Shape" value={variety.GrainShape} />
                    <InfoField label="Potential Yield (tons/ha)" value={variety.PotentialYields} />
                    <InfoField label="Breeder Seed Availability (kg)" value={variety.Bsavailability} />
                    <InfoField label="Foundation Seed Availability (kg)" value={variety.Seedavailability} />
                    <InfoField
                        label="State Recommended"
                        value={variety.StatetRecommended || variety.StateitRecommended}
                    />
                    <div className="md:col-span-2">
                        <InfoField label="Special Trait" value={variety.SpecialTrait} />
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
            className={`w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100 ${props.className || ""}`}
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
            className={`w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100 ${props.className || ""}`}
        />
    </div>
);

const BreederVarietiesSection = ({ breederData, refreshBreederByDocumentId, api }) => {
    const [savingVarieties, setSavingVarieties] = useState(false);
    const [selectedVariety, setSelectedVariety] = useState(null);
    const [showVarietyModal, setShowVarietyModal] = useState(false);
    const [newVariety, setNewVariety] = useState({ ...emptyVariety });

    const savedVarieties = useMemo(() => {
        const varietyData = breederData?.[0]?.nominatedvariety?.variety;
        if (Array.isArray(varietyData)) return varietyData;
        if (varietyData) return [varietyData];
        return [];
    }, [breederData]);

    const openVarietyModal = (item) => {
        setSelectedVariety(item);
        setShowVarietyModal(true);
    };

    const closeVarietyModal = () => {
        setSelectedVariety(null);
        setShowVarietyModal(false);
    };

    const handleNewVarietyChange = (field, value) => {
        setNewVariety((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const resetForm = () => {
        setNewVariety({ ...emptyVariety });
    };

    const handleSaveNominations = async () => {
        if (!breederData?.length) {
            alert("No breeder data found");
            return;
        }

        // Validate all mandatory fields (all except MarketSegment)
        const mandatoryFields = [
            { key: "variety", label: "Variety Name" },
            { key: "Duration", label: "Duration (days after sowing)" },
            { key: "Ecosystem", label: "Ecosystem" },
            { key: "GrainShape", label: "Grain Shape" },
            { key: "PotentialYields", label: "Potential Yield (tons/ha)" },
            { key: "Bsavailability", label: "Breeder Seed Availability (kg)" },
            { key: "Seedavailability", label: "Foundation Seed Availability (kg)" },
            { key: "StatetRecommended", label: "State Recommended" },
            { key: "SpecialTrait", label: "Special Trait" },
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

            const breederDocumentId = breederData[0].documentId;
            const existingVarietiesRaw = breederData[0]?.nominatedvariety?.variety || [];

            const normalizeNumber = (value) => {
                if (value === "" || value === null || value === undefined) return null;
                const num = Number(value);
                return Number.isNaN(num) ? null : num;
            };

            const existingVarieties = existingVarietiesRaw.map((item) => ({
                variety: item?.variety || "",
                Duration: normalizeNumber(item?.Duration),
                Ecosystem: item?.Ecosystem || "",
                MarketSegment: item?.MarketSegment || "",
                GrainShape: item?.GrainShape || "",
                PotentialYields: normalizeNumber(item?.PotentialYields),
                Bsavailability: normalizeNumber(item?.Bsavailability),
                Seedavailability: normalizeNumber(item?.Seedavailability),
                StatetRecommended: item?.StatetRecommended || item?.StateitRecommended || "",
                SpecialTrait: item?.SpecialTrait || "",
            }));

            const cleanedVariety = {
                variety: newVariety.variety?.trim() || "",
                Duration: normalizeNumber(newVariety.Duration),
                Ecosystem: newVariety.Ecosystem?.trim() || "",
                MarketSegment: newVariety.MarketSegment?.trim() || "",
                GrainShape: newVariety.GrainShape?.trim() || "",
                PotentialYields: normalizeNumber(newVariety.PotentialYields),
                Bsavailability: normalizeNumber(newVariety.Bsavailability),
                Seedavailability: normalizeNumber(newVariety.Seedavailability),
                StatetRecommended: newVariety.StatetRecommended?.trim() || "",
                SpecialTrait: newVariety.SpecialTrait?.trim() || "",
            };

            const payload = {
                data: {
                    nominatedvariety: {
                        variety: [...existingVarieties, cleanedVariety],
                    },
                },
            };

            await api.put(`/breeder-requests/${breederDocumentId}`, payload);
            await refreshBreederByDocumentId(breederDocumentId);

            setNewVariety({ ...emptyVariety });
            alert("Variety added successfully");
        } catch (error) {
            console.error("FULL SAVE ERROR =>", error);
            console.error("STATUS =>", error?.response?.status);
            console.error("ERROR DATA =>", error?.response?.data);
            console.error("ERROR MESSAGE =>", error?.response?.data?.error?.message);
            console.error("ERROR DETAILS =>", error?.response?.data?.error?.details);
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
                            🌾 Nominated Varieties
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Click any variety to view full details
                        </p>
                    </div>

                    <div className="text-sm font-medium text-gray-500">
                        Total: {savedVarieties.length}
                    </div>
                </div>

                <div className="mb-8">
                    {savedVarieties.length > 0 ? (
                        <div className="overflow-hidden rounded-2xl border border-gray-200">
                            <div className="hidden md:grid grid-cols-4 bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700">
                                <p>Variety</p>
                                <p>Duration</p>
                                <p>Ecosystem</p>
                                <p>Market Segment</p>
                            </div>

                            <div className="divide-y divide-gray-200">
                                {savedVarieties.map((item, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => openVarietyModal(item)}
                                        className="w-full text-left px-4 py-4 hover:bg-green-50 transition"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
                                            <div>
                                                <p className="text-xs text-gray-500 md:hidden">Variety</p>
                                                <p className="font-semibold text-gray-900">
                                                    {item.variety || "N/A"}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-500 md:hidden">Duration</p>
                                                <p className="text-gray-700">{item.Duration || "N/A"}</p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-500 md:hidden">Ecosystem</p>
                                                <p className="text-gray-700 truncate">
                                                    {item.Ecosystem || "N/A"}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-500 md:hidden">
                                                    Market Segment
                                                </p>
                                                <p className="text-gray-700 truncate">
                                                    {item.MarketSegment || "N/A"}
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
                                No nominated varieties yet
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Add your first variety using the form below
                            </p>
                        </div>
                    )}
                </div>

                <div className="border-t border-gray-200 pt-8">
                    <div className="max-w-4xl">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            Add New Variety
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Fill in the details below to add a new nominated variety. Fields marked <span className="text-red-500">*</span> are required.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                label="Variety Name"
                                required
                                type="text"
                                placeholder="Enter variety name"
                                value={newVariety.variety}
                                onChange={(e) =>
                                    handleNewVarietyChange("variety", e.target.value)
                                }
                            />

                            <InputField
                                label="Duration (days after sowing)"
                                required
                                type="number"
                                placeholder="Enter duration in days"
                                value={newVariety.Duration}
                                onChange={(e) =>
                                    handleNewVarietyChange("Duration", e.target.value)
                                }
                            />

                            <InputField
                                label="Ecosystem"
                                required
                                type="text"
                                placeholder="Enter ecosystem"
                                value={newVariety.Ecosystem}
                                onChange={(e) =>
                                    handleNewVarietyChange("Ecosystem", e.target.value)
                                }
                            />

                            {/* Market Segment — optional */}
                            <InputField
                                label="Market Segment"
                                type="text"
                                placeholder="Enter market segment"
                                value={newVariety.MarketSegment}
                                onChange={(e) =>
                                    handleNewVarietyChange("MarketSegment", e.target.value)
                                }
                            />

                            <InputField
                                label="Grain Shape"
                                required
                                type="text"
                                placeholder="Enter grain shape"
                                value={newVariety.GrainShape}
                                onChange={(e) => {
                                    // Allow alphabets and spaces only
                                    const val = e.target.value;
                                    if (/^[a-zA-Z\s]*$/.test(val)) {
                                        handleNewVarietyChange("GrainShape", val);
                                    }
                                }}
                            />

                            <InputField
                                label="Potential Yield (tons/ha)"
                                required
                                type="number"
                                placeholder="Enter potential yield"
                                value={newVariety.PotentialYields}
                                onChange={(e) =>
                                    handleNewVarietyChange("PotentialYields", e.target.value)
                                }
                            />

                            <InputField
                                label="Breeder Seed Availability (kg)"
                                required
                                type="number"
                                placeholder='Enter quantity in kg, or "0" if not available'
                                value={newVariety.Bsavailability}
                                onChange={(e) =>
                                    handleNewVarietyChange("Bsavailability", e.target.value)
                                }
                            />

                            <InputField
                                label="Foundation Seed Availability (kg)"
                                required
                                type="number"
                                placeholder='Enter quantity in kg, or "0" if not available'
                                value={newVariety.Seedavailability}
                                onChange={(e) =>
                                    handleNewVarietyChange("Seedavailability", e.target.value)
                                }
                            />

                            <div className="md:col-span-2">
                                <InputField
                                    label="State Recommended"
                                    required
                                    type="text"
                                    placeholder="Enter recommended state"
                                    value={newVariety.StatetRecommended}
                                    onChange={(e) =>
                                        handleNewVarietyChange("StatetRecommended", e.target.value)
                                    }
                                />
                            </div>

                            <div className="md:col-span-2">
                                <TextareaField
                                    label="Special Trait"
                                    required
                                    placeholder="Enter special trait"
                                    rows={4}
                                    value={newVariety.SpecialTrait}
                                    onChange={(e) =>
                                        handleNewVarietyChange("SpecialTrait", e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={handleSaveNominations}
                                disabled={savingVarieties}
                                className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                            >
                                {savingVarieties ? "Saving..." : "Add Variety"}
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

export default BreederVarietiesSection;
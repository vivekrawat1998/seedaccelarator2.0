import Field from "../hooks/Fields";

const VarietyForm = ({
    nominatedVarieties,
    onChange,
    onAdd,
    onRemove,
    saving,
    showListView = false
}) => {
    const fields = [
        { key: "variety", type: "text", placeholder: "Variety *", required: true },
        { key: "Duration", type: "number", placeholder: "Duration" },
        { key: "Ecosystem", type: "text", placeholder: "Ecosystem" },
        { key: "MarketSegment", type: "text", placeholder: "Market Segment" },
        { key: "GrainShape", type: "number", placeholder: "Grain Shape" },
        { key: "PotentialYields", type: "number", placeholder: "Potential Yields" },
        { key: "Bsavailability", type: "number", placeholder: "BS Availability" },
        { key: "Seedavailability", type: "number", placeholder: "Seed Availability" },
        { key: "StatetRecommended", type: "text", placeholder: "State Recommended", fullWidth: true },
        { key: "SpecialTrait", type: "textarea", placeholder: "Special Trait", fullWidth: true, rows: 3 }
    ];

    if (showListView) {
        return (
            <div className="space-y-6">
                {nominatedVarieties.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-2xl p-5 bg-gray-50 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">Variety #{index + 1}</h3>
                            {nominatedVarieties.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => onRemove(index)}
                                    className="text-red-600 font-medium hover:text-red-800"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            {fields.map((field) => (
                                <div key={field.key} className={field.fullWidth ? "md:col-span-2" : ""}>
                                    <input
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        value={item[field.key]}
                                        onChange={(e) => onChange(index, field.key, e.target.value)}
                                        className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        rows={field.rows}
                                        as={field.type === "textarea" ? "textarea" : "input"}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {nominatedVarieties.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-2xl p-5 bg-gray-50 space-y-4">
                    {/* Same form fields as above */}
                </div>
            ))}
        </div>
    );
};

export default VarietyForm;
const VarietyList = ({ varieties, onEdit }) => {
    if (!varieties?.length) {
        return (
            <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-4">🌱</div>
                <p>No varieties nominated yet</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {varieties.map((variety, index) => (
                <div key={index} className="p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-lg text-gray-900">
                            {variety.variety || `Variety ${index + 1}`}
                        </h4>
                        <button
                            onClick={() => onEdit(index)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                            Edit
                        </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div><strong>Duration:</strong> {variety.Duration || "N/A"}</div>
                        <div><strong>Ecosystem:</strong> {variety.Ecosystem || "N/A"}</div>
                        <div><strong>Market:</strong> {variety.MarketSegment || "N/A"}</div>
                        <div><strong>Grain Shape:</strong> {variety.GrainShape || "N/A"}</div>
                        <div><strong>Yield:</strong> {variety.PotentialYields || "N/A"}</div>
                        <div><strong>BS Avail:</strong> {variety.Bsavailability || "N/A"}</div>
                        <div><strong>Seed Avail:</strong> {variety.Seedavailability || "N/A"}</div>
                        <div className="md:col-span-2">
                            <strong>Special Trait:</strong> {variety.SpecialTrait || "N/A"}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VarietyList;
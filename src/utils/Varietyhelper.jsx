export const emptyVariety = {
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

export const mapVarietyRowsToForm = (rows = []) =>
    rows.map((item) => ({
        variety: item?.variety || "",
        Duration: item?.Duration ?? "",
        Ecosystem: item?.Ecosystem || "",
        MarketSegment: item?.MarketSegment || "",
        GrainShape: item?.GrainShape ?? "",
        PotentialYields: item?.PotentialYields ?? "",
        Bsavailability: item?.Bsavailability ?? "",
        Seedavailability: item?.Seedavailability ?? "",
        StatetRecommended: item?.StatetRecommended || item?.StateitRecommended || "",
        SpecialTrait: item?.SpecialTrait || "",
    }));

export const cleanVarietyData = (variety) => ({
    variety: variety.variety?.trim() || "",
    Duration: variety.Duration !== "" && variety.Duration !== null ? Number(variety.Duration) : null,
    Ecosystem: variety.Ecosystem?.trim() || "",
    MarketSegment: variety.MarketSegment?.trim() || "",
    GrainShape: variety.GrainShape !== "" && variety.GrainShape !== null ? Number(variety.GrainShape) : null,
    PotentialYields: variety.PotentialYields !== "" && variety.PotentialYields !== null ? Number(variety.PotentialYields) : null,
    Bsavailability: variety.Bsavailability !== "" && variety.Bsavailability !== null ? Number(variety.Bsavailability) : null,
    Seedavailability: variety.Seedavailability !== "" && variety.Seedavailability !== null ? Number(variety.Seedavailability) : null,
    StatetRecommended: variety.StatetRecommended?.trim() || "",
    SpecialTrait: variety.SpecialTrait?.trim() || "",
});
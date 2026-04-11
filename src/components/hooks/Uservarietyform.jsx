import { useEffect, useState, useCallback } from "react";
import { emptyVariety, mapVarietyRowsToForm } from "../../utils/Varietyhelper";

export default function useVarietyForm(breederData) {
    const [nominatedVarieties, setNominatedVarieties] = useState([emptyVariety]);
    const [savingVarieties, setSavingVarieties] = useState(false);

    useEffect(() => {
        if (breederData.length > 0) {
            const breeder = breederData[0];
            const rows = breeder?.nominatedvariety?.variety || [];
            if (Array.isArray(rows) && rows.length > 0) {
                setNominatedVarieties(mapVarietyRowsToForm(rows));
            } else {
                setNominatedVarieties([emptyVariety]);
            }
        } else {
            setNominatedVarieties([emptyVariety]);
        }
    }, [breederData]);

    const handleVarietyChange = useCallback((index, field, value) => {
        setNominatedVarieties((prev) =>
            prev.map((item, i) => i === index ? { ...item, [field]: value } : item)
        );
    }, []);

    const addVarietyRow = useCallback(() => {
        setNominatedVarieties((prev) => [...prev, emptyVariety]);
    }, []);

    const removeVarietyRow = useCallback((index) => {
        setNominatedVarieties((prev) =>
            prev.length === 1 ? prev : prev.filter((_, i) => i !== index)
        );
    }, []);

    const handleSaveNominations = useCallback(async (breederId, refreshBreeder) => {
        if (!breederData.length) {
            alert("No breeder data found");
            return;
        }

        try {
            setSavingVarieties(true);

            const cleanedVarieties = nominatedVarieties
                .map(cleanVarietyData)
                .filter((item) => item.variety);

            const payload = {
                data: {
                    nominatedvariety: {
                        variety: cleanedVarieties,
                    },
                },
            };

            const saveRes = await api.put(`/breeder-requests/${breederId}`, payload);
            await refreshBreeder(breederId);
            alert("Varieties saved successfully");
        } catch (error) {
            console.error("SAVE ERROR =>", error?.response?.data || error);
            alert("Save failed. Check console.");
        } finally {
            setSavingVarieties(false);
        }
    }, [breederData, nominatedVarieties]);

    return {
        nominatedVarieties,
        savingVarieties,
        handleVarietyChange,
        addVarietyRow,
        removeVarietyRow,
        handleSaveNominations
    };
}
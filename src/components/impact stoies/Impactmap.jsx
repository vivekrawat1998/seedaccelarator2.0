import React, { useEffect, useState } from "react";
import {
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";

import { Tooltip } from "react-tooltip";
import indiaMap from "../../utils/India_states.json";
import api from "../../api/axios";

const ImpactMap = ({ filters = {} }) => {
    const [mapData, setMapData] = useState([]);
    const [tooltipData, setTooltipData] = useState(null);
    const [selectedState, setSelectedState] = useState(null); // ✅ RIGHT PANEL DATA

    // ✅ Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/mapdatas");
                setMapData(res?.data?.data || []);
            } catch (error) {
                console.error("API Error:", error);
                setMapData([]);
            }
        };

        fetchData();
    }, []);

    // ✅ Normalize helper
    const normalize = (value) =>
        value?.toString().trim().toLowerCase();

    // ✅ Filter logic
    const filteredData = (mapData || []).filter((item) => {
        return (
            (!filters?.year ||
                Number(item?.year) === Number(filters.year)) &&
            (!filters?.activity ||
                normalize(item?.activityType) === normalize(filters.activity)) &&
            (!filters?.state ||
                normalize(item?.state) === normalize(filters.state))
        );
    });

    // ✅ Match state
    const getStateInfo = (stateName) => {
        return filteredData.find(
            (d) => normalize(d?.state) === normalize(stateName)
        );
    };

    return (
        <div className="bg-green-100 rounded-xl shadow-lg p-4 md:p-6">

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

                <div>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-Nunito text-gray-800">
                        Impact Map
                    </h2>

                    <p className="text-gray-500 text-sm md:text-lg lg:text-xl mt-2">
                        Visual representation of activities across Indian states
                    </p>
                </div>

                <div className="flex gap-4 md:gap-6 text-xs md:text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-green-700"></span>
                        Active
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-gray-300"></span>
                        No Data
                    </div>
                </div>
            </div>

            {/* ✅ RESPONSIVE GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* 🌍 MAP SECTION */}
                <div className="lg:col-span-2 border rounded-lg overflow-hidden bg-white">
                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{
                            scale: 1000,
                            center: [80, 23]
                        }}
                        className="h-[400px] md:h-[500px] w-full"
                    >
                        <Geographies geography={indiaMap}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const stateName =
                                        geo?.properties?.st_nm ||
                                        geo?.properties?.NAME_1 ||
                                        "";

                                    const stateInfo = getStateInfo(stateName);
                                    const isHighlighted = !!stateInfo;

                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            data-tooltip-id="mapTooltip"

                                            onMouseEnter={() => {
                                                if (stateInfo) {
                                                    setTooltipData({
                                                        state: stateName,
                                                        year: stateInfo.year,
                                                        activity: stateInfo.activityType,
                                                        quantity: stateInfo.quantity,
                                                        count: stateInfo.count
                                                    });
                                                } else {
                                                    setTooltipData({ state: stateName });
                                                }
                                            }}

                                            // ✅ CLICK → SHOW RIGHT PANEL
                                            onClick={() => {
                                                if (stateInfo) {
                                                    setSelectedState({
                                                        state: stateName,
                                                        ...stateInfo
                                                    });
                                                }
                                            }}

                                            style={{
                                                default: {
                                                    fill: isHighlighted
                                                        ? "#166534"
                                                        : "#d1d5db",
                                                    outline: "none"
                                                },
                                                hover: {
                                                    fill: "#f97316",
                                                    cursor: "pointer"
                                                }
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    </ComposableMap>
                </div>

                {/* 📊 RIGHT PANEL */}
                <div className="bg-white rounded-lg font-Karla shadow-md p-5 min-h-[200px] flex flex-col justify-center">

                    {!selectedState ? (
                        <div className="text-center text-gray-500">
                            <p className="text-lg font-semibold">
                                Select a state
                            </p>
                            <p className="text-sm mt-2">
                                Click on map to see details
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-green-700">
                                {selectedState.state}
                            </h3>

                            <div className="bg-green-50 p-3 rounded-md">
                                <p className="text-sm text-gray-600">Year</p>
                                <p className="text-lg font-semibold">
                                    {selectedState.year || "N/A"}
                                </p>
                            </div>

                            <div className="bg-green-50 p-3 rounded-md">
                                <p className="text-sm text-gray-600">
                                    Activity
                                </p>
                                <p className="text-lg font-semibold">
                                    {selectedState.activityType || "N/A"}
                                </p>
                            </div>
                            <div className="bg-green-50 p-3 rounded-md">
                                <p className="text-sm text-gray-600">
                                    Quantity
                                </p>
                                <p className="text-lg font-semibold">
                                    {selectedState.quantity || "N/A"}
                                </p>
                            </div>
                            <div className="bg-green-50 p-3 rounded-md">
                                <p className="text-sm text-gray-600">
                                    Count
                                </p>
                                <p className="text-lg font-semibold">
                                    {selectedState.count || "N/A"}
                                </p>
                            </div>

                            {/* 👉 ADD MORE FIELDS FROM API */}
                            {selectedState.value && (
                                <div className="bg-green-50 p-3 rounded-md">
                                    <p className="text-sm text-gray-600">
                                        Value
                                    </p>
                                    <p className="text-lg font-semibold">
                                        {selectedState.value}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* 🔥 TOOLTIP */}
            <Tooltip
                id="mapTooltip"
                place="top"
                className="!bg-black !text-white !p-2 !rounded-md"
            >
                {tooltipData && (
                    <div className="text-sm">
                        <div className="font-bold">
                            {tooltipData.state}
                        </div>

                        {tooltipData.year && (
                            <div>📅 {tooltipData.year}</div>
                        )}

                        {tooltipData.activity && (
                            <div>⚡ {tooltipData.activity}</div>
                        )}
                        {tooltipData.quantity && (
                            <div>📦 {tooltipData.quantity}</div>
                        )}
                        {tooltipData.count && (
                            <div>📊 {tooltipData.count}</div>
                        )}
                    </div>
                )}
            </Tooltip>
        </div>
    );
};

export default ImpactMap;
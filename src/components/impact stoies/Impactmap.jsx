import React, { useEffect, useState } from "react";
import {
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";

import { Tooltip } from "react-tooltip";
import { X, MapPin, Calendar, Activity } from "lucide-react";

import indiaMap from "../../utils/India_states.json";
import api from "../../api/axios";

const ImpactMap = ({ filters = {} }) => {
    const [mapData, setMapData] = useState([]);
    const [tooltipContent, setTooltipContent] = useState("");
    const [selectedState, setSelectedState] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/mapdatas");

                console.log("API Response:", res);

                // ✅ SAFE DATA SET
                setMapData(res?.data?.data || []);
            } catch (error) {
                console.log("Map API Error:", error);

                // ✅ fallback (important for production)
                setMapData([]);
            }
        };

        fetchData();
    }, []);

    // ✅ SAFE FILTER
    const filteredData = (mapData || []).filter((item) => {
        return (
            (!filters?.year || item?.year === filters.year) &&
            (!filters?.activity || item?.activityType === filters.activity) &&
            (!filters?.state || item?.state === filters.state)
        );
    });

    const getStateInfo = (stateName) => {
        return filteredData.find(
            (d) =>
                d?.state?.trim()?.toLowerCase() ===
                stateName?.trim()?.toLowerCase()
        );
    };

    return (
        <div className="bg-green-200 rounded-md border font-Karla border-prime shadow-lg p-4 md:p-6 relative">

            {/* HEADER */}
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

            {/* MAP */}
            <div className="border rounded-md overflow-hidden bg-gray-50">

                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{
                        scale: 900,
                        center: [82, 22]
                    }}
                    style={{
                        width: "100%",
                        height: "auto"
                    }}
                    className="h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px]"
                >
                    <Geographies geography={indiaMap}>
                        {({ geographies }) =>
                            (geographies || []).map((geo) => {
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
                                            setTooltipContent(stateName);

                                            if (stateInfo) {
                                                setSelectedState({
                                                    state: stateName,
                                                    ...stateInfo
                                                });
                                            }
                                        }}

                                        onMouseLeave={() => {
                                            // Optional: remove selection on leave
                                            // setSelectedState(null);
                                        }}

                                        style={{
                                            default: {
                                                fill: isHighlighted
                                                    ? "#166534"
                                                    : "#d1d5db",
                                                outline: "none",
                                                transition: "all .25s ease"
                                            },

                                            hover: {
                                                fill: "#f97316",
                                                outline: "none",
                                                cursor: "pointer"
                                            },

                                            pressed: {
                                                fill: "#ea580c",
                                                outline: "none"
                                            }
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ComposableMap>
            </div>

            {/* TOOLTIP */}
            <Tooltip
                id="mapTooltip"
                className="bg-gray-900 text-white px-3 py-2 rounded-md text-xs shadow-lg"
            >
                {tooltipContent || "No data"}
            </Tooltip>

            {/* STATE PANEL */}
            {selectedState && (
                <div
                    className="
        fixed md:absolute
        bottom-0 md:bottom-16
        left-0 md:left-auto
        right-0 md:right-6
        w-full md:w-72
        bg-white
        border border-prime
        shadow-xl
        rounded-t-xl md:rounded-md
        p-5
        z-50
        "
                >
                    <div className="flex justify-between items-center mb-4">

                        <div className="flex items-center gap-2">
                            <MapPin size={18} className="text-green-600" />

                            <h3 className="font-semibold text-gray-800">
                                {selectedState?.state}
                            </h3>
                        </div>

                        <button
                            onClick={() => setSelectedState(null)}
                            className="text-gray-400 hover:text-red-500"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3 text-sm">

                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar size={16} />
                            <span>
                                <b>Year:</b> {selectedState?.year || "N/A"}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                            <Activity size={16} />
                            <span>
                                <b>Activity:</b> {selectedState?.activityType || "N/A"}
                            </span>
                        </div>

                        <div className="flex justify-between bg-prime/50 rounded-lg p-3">
                            <div>
                                <p className="text-xs text-black">Quantity</p>
                                <p className="font-semibold text-gray-800">
                                    {selectedState?.quantity || 0}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-black">Count</p>
                                <p className="font-semibold text-gray-800">
                                    {selectedState?.count || 0}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default ImpactMap;
import React, { useEffect, useState, useMemo } from "react";
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
    const [selectedState, setSelectedState] = useState(null);
    const excludedStates = ["rajasthan"];

    // ✅ FETCH DATA (FIXED FOR YOUR API)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/mapdatas");

                // ✅ Your API already returns flat structure
                const formattedData = res?.data?.data || [];

                setMapData(formattedData);
            } catch (error) {
                console.error("API Error:", error);
                setMapData([]);
            }
        };

        fetchData();
    }, []);

    // ✅ FILTER DATA FIRST
    // ✅ Normalize helper
    const normalize = (value) =>
        value?.toString().trim().toLowerCase();

    // ✅ FILTER FIRST
    const filteredData = useMemo(() => {
        return (mapData || []).filter((item) => {
            return (
                (!filters?.year ||
                    (Number(item?.startyear) <= Number(filters.year) &&
                        Number(item?.endyear) >= Number(filters.year))) &&
                (!filters?.state ||
                    normalize(item?.state) === normalize(filters.state))
            );
        });
    }, [mapData, filters]);

    // ✅ THEN TOTAL
    const totalData = useMemo(() => {
        return filteredData.reduce(
            (acc, item) => {
                acc.breederSeeds += Number(item?.breederSeeds || 0);
                acc.clusterDemo += Number(item?.clusterDemo || 0);
                acc.minikitDemo += Number(item?.minikitDemo || 0);
                return acc;
            },
            { breederSeeds: 0, clusterDemo: 0, minikitDemo: 0 }
        );
    }, [filteredData]);

    // ✅ COUNTS
    const totalStates = filteredData.length;

    // ✅ Match state
    const getStateInfo = (stateName) => {
        return filteredData.find(
            (d) => normalize(d?.state) === normalize(stateName)
        );
    };

    return (
        <div className="bg-green-100 rounded-xl shadow-lg p-4 md:p-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-2xl md:text-4xl font-bold font-Nunito tracking-[3px] text-gray-800">
                        Impact Across Indian States
                    </h2>
                </div>

                {/* ✅ TOTAL STATES */}
              
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* MAP */}
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
                                    const isExcluded = excludedStates.includes(
                                        normalize(stateName)
                                    );

                                    const isHighlighted =
                                        !!stateInfo && !isExcluded;

                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            data-tooltip-id="mapTooltip"

                                            onMouseEnter={() => {
                                                if (stateInfo) {
                                                    setTooltipData({
                                                        state: stateName,
                                                        startyear: stateInfo.startyear,
                                                        endyear: stateInfo.endyear,
                                                        breederSeeds: stateInfo.breederSeeds,
                                                        clusterDemo: stateInfo.clusterDemo,
                                                        minikitDemo: stateInfo.minikitDemo
                                                    });
                                                } else {
                                                    setTooltipData({ state: stateName });
                                                }
                                            }}

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

                {/* RIGHT PANEL */}
                <div className="bg-white rounded-lg shadow-md p-5 flex flex-col justify-center">

                    {!selectedState ? (
                        <div className="space-y-4">

                            <h3 className="text-2xl font-bold text-green-700 text-start">
                                India
                            </h3>



                            {/* ACTIVE STATES */}
                            {/* <div className="bg-green-50 p-3 rounded-md">
                                <p className="text-sm text-gray-600">India</p>
                                <p className="text-lg font-semibold">
                                    {totalStates}
                                </p>
                            </div> */}
                            <div className="bg-green-50 p-3 rounded-md">
                                <p className="text-sm text-gray-600">Year Range</p>
                                <p className="text-lg font-semibold">
                                    2022-2025
                                </p>
                            </div>

                            {/* TOTAL DATA */}
                            <div className="bg-green-50 p-3 rounded-md">
                                <p className="text-sm text-gray-600">
                                    BS Linkage Facilitated (kg)
                                </p>
                                <p className="text-lg font-semibold">
                                    {totalData.breederSeeds.toLocaleString()}
                                </p>
                            </div>

                            <div className="bg-green-50 p-3 rounded-md">
                                <p className="text-sm text-gray-600">
                                    Total Cluster Demonstration (ha)
                                </p>
                                <p className="text-lg font-semibold">
                                    {totalData.clusterDemo.toLocaleString()}
                                </p>
                            </div>

                            <div className="bg-green-50 p-3 rounded-md">
                                <p className="text-sm text-gray-600">
                                    Total Minikit Demonstration
                                </p>
                                <p className="text-lg font-semibold">
                                    {totalData.minikitDemo.toLocaleString()}
                                </p>
                            </div>

                        </div>
                    ) : (
                        <div className="space-y-4">

                            <h3 className="text-2xl font-bold text-green-700">
                                {selectedState.state}
                            </h3>

                            {/* YEAR RANGE */}
                            <div className="bg-green-50 p-3 rounded-md">
                                <p className="text-sm text-gray-600">Year Range</p>
                                <p className="text-lg font-semibold">
                                    {selectedState.startyear} - {selectedState.endyear}
                                </p>
                            </div>

                            {/* DATA */}
                            <div className="bg-green-50 p-3 rounded-md">
                                <p className="text-sm text-gray-600">
                                    Breeder Seeds distributed (kg)
                                </p>
                                <p className="text-lg font-semibold">
                                    {selectedState.breederSeeds || "N/A"}
                                </p>
                            </div>

                            <div className="bg-green-50 p-3 rounded-md">
                                <p className="text-sm text-gray-600">
                                    Cluster Demonstration (ha)
                                </p>
                                <p className="text-lg font-semibold">
                                    {selectedState.clusterDemo || "N/A"}
                                </p>
                            </div>

                            <div className="bg-green-50 p-3 rounded-md">
                                <p className="text-sm text-gray-600">
                                    Minikit Demonstration (count)
                                </p>
                                <p className="text-lg font-semibold">
                                    {selectedState.minikitDemo || "N/A"}
                                </p>
                            </div>

                        </div>
                    )}
                </div>
            </div>

            {/* TOOLTIP */}
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

                        {tooltipData.startyear && tooltipData.endyear && (
                            <div>
                                📅 {tooltipData.startyear} - {tooltipData.endyear}
                            </div>
                        )}

                        {tooltipData.breederSeeds && (
                            <div> BS: {tooltipData.breederSeeds} kg</div>
                        )}

                        {tooltipData.clusterDemo && (
                            <div> CD: {tooltipData.clusterDemo} ha</div>
                        )}

                        {tooltipData.minikitDemo && (
                            <div> Minikit: {tooltipData.minikitDemo}</div>
                        )}
                    </div>
                )}
            </Tooltip>
        </div>
    );
};

export default ImpactMap;
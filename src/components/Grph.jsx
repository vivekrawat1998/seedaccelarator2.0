import React, { useMemo } from "react";
import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer,
    LabelList
} from "recharts";
import { Cell } from "recharts";

export default function ProductEvaluationChart({ data, selectedState }) {

    /* ================= FILTER BY STATE ================= */
    const filteredData = useMemo(() => {
        return data.filter(item =>
            item.state?.toLowerCase().trim() ===
            selectedState?.toLowerCase().trim()
        );
    }, [data, selectedState]);

    console.log("Filtered After Fix:", filteredData);

    console.log("Selected State:", selectedState);
    console.log("All States:", data.map(i => i.state));
    console.log("Filtered:", filteredData);
    if (!selectedState) {
        return <p>Please select a state to view graph</p>;
    }
    /* ================= FORMAT ================= */
    const chartData = useMemo(() => {
        return filteredData
            .sort((a, b) => b.predictedMeans - a.predictedMeans)
            .slice(0, 6)
            .map((item, index, arr) => ({
                name: item.varietyName,
                predicted: Number(item.predictedMeans),
                gainLocal: Number(item.gainLocal),
                gainBenchmark: Number(item.gainBenchmark),
                fill: index === arr.length - 1 ? "#c99a00" : "#1f4e79"
            }));
    }, [filteredData]);

    if (!chartData.length) return <p>No data</p>;

    return (
        <div className="bg-white p-6 rounded-xl mt-6">
            <h2 className="text-lg font-bold mb-4">
                {selectedState} Product Evaluation
            </h2>

            <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    {/* X AXIS */}
                    <XAxis
                        dataKey="name"
                        angle={-20}
                        textAnchor="end"
                        interval={0}
                    />

                    {/* Y AXIS */}
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />

                    <Tooltip />
                    <Legend />

                    {/* BAR */}
                    <Bar
                        yAxisId="left"
                        dataKey="predicted"
                        name="Predicted Mean Yield"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={index} fill={entry.fill} />
                        ))}

                        {/* LABEL ON BAR */}
                        <LabelList
                            dataKey="predicted"
                            position="top"
                            fill="black"
                        />
                    </Bar>

                    {/* LINE → LOCAL */}
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="gainLocal"
                        stroke="#66bb6a"
                        strokeWidth={3}
                        name="% Gain BM"
                    />

                    {/* LINE → BENCHMARK */}
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="gainBenchmark"
                        stroke="#f4b400"
                        strokeWidth={3}
                        name="% Gain FV"
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
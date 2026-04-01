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
    ResponsiveContainer
} from "recharts";

export default function ProductEvaluationChart({ data }) {

    const chartData = data.map(item => ({
        name: item.varietyName,
        predicted: Number(item.predictedMeans),
        gainLocal: Number(item.gainLocal),
        gainBenchmark: Number(item.gainBenchmark)
    }));

    return (
        <div className="bg-white p-6 rounded-xl mt-6">
            <h2 className="text-lg font-bold mb-4">
                Product Evaluation Graph
            </h2>

            <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />

                    <Tooltip />
                    <Legend />

                    {/* BAR → Predicted */}
                    <Bar
                        yAxisId="left"
                        dataKey="predicted"
                        fill="#1f4e79"
                        name="Predicted Mean"
                    />

                    {/* LINE → Local */}
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="gainLocal"
                        stroke="#82ca9d"
                        strokeWidth={3}
                        name="% Gain Local"
                    />

                    {/* LINE → Benchmark */}
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="gainBenchmark"
                        stroke="#f4b400"
                        strokeWidth={3}
                        name="% Gain Benchmark"
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
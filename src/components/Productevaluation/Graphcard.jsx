// components/AutoGraphCard.jsx
import {
    ResponsiveContainer,
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
} from "recharts";

export default function AutoGraphCard({ graph }) {
    // Transform varieties array to recharts data format
    const chartData = graph.varieties.map(v => ({
        name: v.name,
        yield: v.yield,
        gainBM: v.gainBM,
        gainFV: v.gainFV,
    }));

    return (
        <div className="border rounded-lg overflow-hidden hover:shadow-xl h-80 flex flex-col">
            {/* Chart */}
            <div className="flex-1 bg-white">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="name"
                            angle={-45}
                            textAnchor="end"
                            height={80}
                            fontSize={10}
                        />
                        <YAxis yAxisId="left" domain={[0, "auto"]} />
                        <YAxis yAxisId="right" orientation="right" domain={[-20, 40]} />
                        <Tooltip />
                        <Legend />

                        <Bar
                            yAxisId="left"
                            dataKey="yield"
                            name="Predicted Mean Yield (t/ha)"
                            fill="#1E40AF"
                            barSize={24}
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="gainBM"
                            name="% Gain over BM"
                            stroke="#059669"
                            strokeWidth={3}
                            dot={{ fill: "#059669", strokeWidth: 2 }}
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="gainFV"
                            name="% Gain over FV"
                            stroke="#D97706"
                            strokeWidth={3}
                            dot={{ fill: "#D97706", strokeWidth: 2 }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            {/* Footer */}
            <div className="p-3 bg-gray-50 border-t">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-bold text-sm text-gray-900 truncate">{graph.state}</h4>
                        <p className="text-xs text-gray-600 truncate">{graph.marketSegment}</p>
                        <p className="text-xs font-medium text-blue-600">{graph.year}</p>
                    </div>
                    {graph.institute && (
                        <p className="text-xs text-gray-500 italic max-w-[120px] truncate">
                            {graph.institute}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
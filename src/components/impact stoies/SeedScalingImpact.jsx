import React, { useState } from "react";
import seedDataByYear from "../../utils/Impactdata";

export default function SeedScalingDashboard() {
  const [selectedYear, setSelectedYear] = useState(seedDataByYear[0].year);
  const yearData = seedDataByYear.find((y) => y.year === selectedYear);

  // Table column headings
  const columns = [
    { key: "variety", label: "Varieties" },
    ...yearData.stateKeys.map((k) => ({
      key: k,
      label: k.replace(/([A-Z])/g, " $1").replace(/^\w/, (c) => c.toUpperCase()),
    })),
  ];

  // Table row data
  const rows = yearData.data.map((row, i) => ({
    id: i,
    variety: row.variety || row.Varieties,
    ...yearData.stateKeys.reduce((acc, k) => {
      acc[k] = row[k] ?? "";
      return acc;
    }, {}),
  }));

  // Find grand total row (for sticky)
  const grandTotalRow = rows.find(
    (r) => r.variety?.toLowerCase() === "grand total"
  );
  const normalRows = rows.filter(
    (r) => r.variety?.toLowerCase() !== "grand total"
  );

  return (
    <div className="container mx-auto mt-12 px-4">
      {/* Heading Section */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-Nunito font-semibold text-[#116530]">
          Seed Scaling Impact
        </h2>
        <p className="text-gray-700 text-base font-Karla mt-2 max-w-2xl mx-auto leading-relaxed">
          Dashboard showing variety-wise and state-wise EGS linkage facilitated
          (2022–2025) — seed quantity in kilograms.
        </p>
      </div>

      {/* Year Filter Buttons */}
      <div className="flex justify-center flex-wrap gap-3 mb-6">
        {seedDataByYear.map((yr) => (
          <button
            key={yr.year}
            onClick={() => setSelectedYear(yr.year)}
            className={`px-5 py-2.5 font-semibold rounded-lg transition-all duration-300 border shadow-sm
              ${
                selectedYear === yr.year
                  ? "bg-[#116530] text-white scale-105 shadow-md"
                  : "bg-[#f3fcf7] text-[#0c8140] border-[#0c8140] hover:bg-[#e9f9ef]"
              }`}
          >
            {yr.year}
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">
        <div className="overflow-x-auto">
          <div style={{ maxHeight: "65vh" }} className="overflow-y-auto relative">
            <table className="w-full text-sm font-Nunito relative">
              {/* Table Header */}
              <thead className="sticky top-0 z-20 bg-gradient-to-r from-[#116530] to-[#198754] text-white shadow-sm">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="px-4 py-3 text-left font-semibold text-[15px] border-b border-green-700/40"
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {normalRows.map((row, i) => (
                  <tr
                    key={row.id}
                    className={`transition-colors duration-300 ${
                      i % 2 === 0
                        ? "bg-white hover:bg-[#f3fcf7]"
                        : "bg-[#f9fefb] hover:bg-[#e9f9ef]"
                    }`}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-4 py-2 border-b border-gray-100"
                      >
                        {row[col.key] || ""}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Sticky Grand Total Row */}
                {grandTotalRow && (
                  <tr className="sticky bottom-0 bg-[#198754] text-white font-bold z-30 shadow-[0_-2px_6px_rgba(0,0,0,0.1)]">
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 border-t border-green-700/50">
                        {grandTotalRow[col.key] || ""}
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

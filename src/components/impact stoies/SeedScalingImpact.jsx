import React, { useState } from "react";
import seedDataByYear from "../../utils/Impactdata";
import Typography from "../../ui/Heading";

export default function SeedScalingDashboard() {
  const [selectedYear, setSelectedYear] = useState(seedDataByYear[0].year);
  const yearData = seedDataByYear.find((y) => y.year === selectedYear);

  // Simplified columns - only Variety and Total Quantity
  const columns = [
    { key: "variety", label: "Varieties" },
    { key: "total", label: "Total Quantity (kg)" },
  ];

  // Table row data - calculate total from all state columns
  const rows = yearData.data.map((row, i) => {
    const variety = row.variety || row.Varieties || "";

    // Sum all numeric values from state columns (skip variety column)
    const total = Object.keys(row)
      .filter(key => key !== 'variety' && key !== 'Varieties')
      .reduce((sum, key) => {
        const value = parseFloat(row[key]);
        return sum + (isNaN(value) ? 0 : value);
      }, 0);

    return {
      id: i,
      variety,
      total: total.toLocaleString() || "0",
    };
  });

  // Find grand total row
  const grandTotalRow = rows.find(
    (r) => r.variety?.toLowerCase() === "grand total"
  );
  const normalRows = rows.filter(
    (r) => r.variety?.toLowerCase() !== "grand total"
  );

  return (
    <div className="container mx-auto mt-12 px-4">
      {/* Heading Section */}
      <div className=" mb-6">
        <Typography variant="h1">
          Seed Scaling Impact
        </Typography>
        <Typography variant="h3">
          Dashboard showing variety-wise total EGS linkage facilitated (2022–2025) — seed quantity in kilograms.
        </Typography>
        <p className="text-gray-700 text-base font-Karla mt-2 max-w-2xl mx-auto leading-relaxed">
        </p>
      </div>

      {/* Year Filter Buttons */}
      <div className="flex  flex-wrap gap-3 mb-6">
        {seedDataByYear.map((yr) => (
          <button
            key={yr.year}
            onClick={() => setSelectedYear(yr.year)}
            className={`px-5 py-2.5 font-semibold rounded-lg transition-all duration-300 border shadow-sm font-Nunito
              ${selectedYear === yr.year
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
                      className="px-4 py-3 text-left font-Karla font-semibold text-[15px] border-b border-green-700/40"
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
                    className={`transition-colors duration-300 ${i % 2 === 0
                      ? "bg-white hover:bg-[#f3fcf7]"
                      : "bg-[#f9fefb] hover:bg-[#e9f9ef]"
                      }`}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-4 py-2 border-b border-gray-100 font-semibold"
                      >
                        {row[col.key] || "0"}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Sticky Grand Total Row */}
                {grandTotalRow && (
                  <tr className="sticky bottom-0 bg-[#198754] text-white font-bold z-30 shadow-[0_-2px_6px_rgba(0,0,0,0.1)]">
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-4 py-3 border-t border-green-700/50 font-extrabold text-lg"
                      >
                        {grandTotalRow[col.key] || "0"}
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

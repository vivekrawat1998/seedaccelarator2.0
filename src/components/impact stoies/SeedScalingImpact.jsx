import React, { useState } from "react";
import seedDataByYear from "../../utils/Impactdata";
import Typography from "../../ui/Heading";

export default function SeedScalingDashboard() {
  const [selectedYear, setSelectedYear] = useState(seedDataByYear[0].year);
  const yearData = seedDataByYear.find((y) => y.year === selectedYear);

  const columns = [
    { key: "variety", label: "Rice Variety" },
    { key: "breederSeeds", label: "BS Linkage Facilitated (kg)" },
    { key: "tlsSeeds", label: "TLS/CS Produced (kg)*" },
    { key: "area", label: "Area Covered (ha)*" },
  ];

  // ✅ Grand totals
  const totals = yearData.data.reduce(
    (acc, row) => {
      acc.breederSeeds += row.breederSeeds || 0;
      acc.tlsSeeds += row.tlsSeeds || 0;
      acc.area += row.area || 0;
      return acc;
    },
    { breederSeeds: 0, tlsSeeds: 0, area: 0 }
  );

  return (
    <div className="container mx-auto mt-12 px-4">

      {/* HEADER */}
      <div className="mb-6">
        <Typography variant="h1" className="text-black">
          Regional Impact - Bangladesh and Nepal
        </Typography>
        <div className="grid md:grid-cols-2 gap-6 mb-20">

          {/* BANGLADESH */}
          <div className="bg-white rounded-2xl  border border-green-100 p-6  transition">

            <h3 className="text-2xl font-bold text-[#116530] mb-4">
              Bangladesh
            </h3>

            <div className="space-y-3 text-gray-700 font-Karla text-sm leading-relaxed">

              <div className="bg-green-50 p-3 rounded-lg">
                <p>
                  During 2022–23, IRRI lines accounted for <b>50%</b> of total BS indent and <b>98%</b> of STRVs.
                </p>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <p>
                  Key varieties: <b>BRRI dhan51, dhan52, dhan67, dhan71, dhan97, dhan99, BINA dhan-17</b>.
                </p>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <p>
                  In 2024–25, seed scaling was catalysed for <b>10 varieties</b> with <b>12 women-led federations</b>.
                </p>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <p>
                  Federations were linked with national partners like <b>BADC</b> and <b>DAE</b>.
                </p>
              </div>

            </div>
          </div>

          {/* NEPAL */}
          <div className="bg-white rounded-2xl  border border-green-100 p-6 transition">

            <h3 className="text-2xl font-bold text-[#116530] mb-4">
              Nepal
            </h3>

            <div className="space-y-3 text-gray-700 font-Karla text-sm leading-relaxed">

              <div className="bg-green-50 p-3 rounded-lg">
                <p>
                  During 2023–25, STRVs accounted for <b>31%</b> of total BS indent.
                </p>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <p>
                  All STRVs were developed using <b>IRRI germplasm</b>.
                </p>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <p>
                  In 2024-25, newer HYVs and STRVs 
                  <b> (Hardinath-6, Gangasagar-2, Ghaya-3) </b>
                   were scaled after the OFTs.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Typography variant="h1" className="text-black">
          Seed Scaling Impact
        </Typography>

      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden ">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-Karla text-green-700">

            {/* HEADER */}
            <thead className="bg-prime text-black text-[20px]">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-3 font-semibold border"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {yearData.data.map((row, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-10 py-2 text-center uppercase text-black border ">{row.variety}</td>
                  <td className="px-10 py-2 text-center text-black border ">
                    {row.breederSeeds.toLocaleString()}
                  </td>
                  <td className="px-10 py-2 text-center text-black border ">
                    {row.tlsSeeds.toLocaleString()}
                  </td>
                  <td className="px-10 py-2 text-center text-black border ">
                    {row.area.toLocaleString()}
                  </td>
                </tr>
              ))}

              {/* GRAND TOTAL */}
              <tr className="bg-prime text-white font-bold">
                <td className="px-4 py-3 text-black text-center ">Grand Total</td>
                <td className="px-4 py-3 text-center text-black border ">
                  {totals.breederSeeds.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-center text-black border ">
                  {totals.tlsSeeds.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-center text-black border ">
                  {totals.area.toLocaleString()}
                </td>
              </tr>
            </tbody>

          </table>
          <div className="mt-4 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-sm font-Karla text-gray-700">
            <span className="font-semibold text-black">* Estimated value</span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
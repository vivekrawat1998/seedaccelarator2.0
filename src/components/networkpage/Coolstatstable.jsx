import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const orgData = [
  {
    type: "National and State Seed Corporations",
    org2024: 5,
    participants2024: 8,
    org2025: 4,
    participants2025: 5,
  },
  {
    type: "NARES",
    org2024: 14,
    participants2024: 16,
    org2025: 3,
    participants2025: 3,
  },
  {
    type: "Private Seed Companies",
    org2024: 17,
    participants2024: 18,
    org2025: 18,
    participants2025: 22,
  },
  {
    type: "NGOs",
    org2024: 2,
    participants2024: 2,
    org2025: 1,
    participants2025: 1,
  },
  {
    type: "FPOs/FPCs",
    org2024: 13,
    participants2024: 13,
    org2025: 3,
    participants2025: 3,
  },
  {
    type: "TOTAL",
    org2024: 51,
    participants2024: 57,
    org2025: 29,
    participants2025: 34,
  },
];

const CoolStatsTables = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      className="max-w-7xl mx-auto grid  mx-auto "
      data-aos="fade-up"
    >
      <div
        className="bg-white rounded-3xl shadow-2xl md:p-8 p-3 border border-green-700 relative"
        data-aos="fade-left"
      >
        <h2 className="md:text-2xl text-lg font-extrabold text-black mb-7 font-Nunito text-center tracking-[3px]">
          Organization Type and Participation
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead className="text-[16px]">
              <tr className="bg-prime text-sm text-white font-Karla">
                <th className="px-4 py-3 text-start rounded-l-xl">Organization Type</th>
                <th className="px-4 py-3">2024 (Organizations)</th>
                <th className="px-4 py-3">2024 (Participants)</th>
                <th className="px-4 py-3">2025 (Organizations)</th>
                <th className="px-4 py-3 rounded-r-xl">2025 (Participants)</th>
              </tr>
            </thead>

            <tbody>
              {orgData.map((row, idx) => (
                <tr
                  key={row.type}
                  className={`${idx % 2 === 0 ? "bg-green-50" : "bg-white"
                    } hover:bg-green-100 font-Karla transition`}
                >
                  <td className="px-4 py-3 font-semibold text-green-800">
                    {row.type}
                  </td>
                  <td className="px-4 py-3 text-yellow-700 text-center font-bold">
                    {row.org2024.toString().padStart(2, "0")}
                  </td>
                  <td className="px-4 py-3 text-center text-yellow-700 font-bold">
                    {row.participants2024.toString().padStart(2, "0")}
                  </td>
                  <td className="px-4 py-3 text-center text-prime font-bold">
                    {row.org2025.toString().padStart(2, "0")}
                  </td>
                  <td className="px-4 py-3 font-bold text-center text-prime">
                    {row.participants2025.toString().padStart(2, "0")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CoolStatsTables;
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const regionData = [
  { region: "North India", p2024: 32, p2025: 6, total: 38, percent: 41.76 },
  { region: "South India", p2024: 9, p2025: 19, total: 28, percent: 30.77 },
  { region: "East India", p2024: 10, p2025: 3, total: 13, percent: 14.29 },
  { region: "West India", p2024: 1, p2025: 3, total: 4, percent: 4.20 },
  { region: "Central India", p2024: 2, p2025: 2, total: 4, percent: 4.20 },
  { region: "Northeast India", p2024: 3, p2025: 3, total: 5, percent: 6.59 },
];

const orgData = [
  { type: "Private Seed Cos", p2024: 17, p2025: 20, total: 37, percent: 40.66 },
  { type: "Public Institutes", p2024: 16, p2025: 3, total: 19, percent: 20.88 },
  { type: "NGOs", p2024: 1, p2025: 3, total: 4, percent: 4.40 },
  { type: "State Gov Depts", p2024: 1, p2025: 1, total: 2, percent: 2.20 },
  { type: "National and state seed organisation", p2024: 1, p2025: 8, total: 9, percent: 9.89 },
  { type: "FPO/FPC", p2024: 15, p2025: 5, total: 20, percent: 21.98 },
];

const CoolStatsTables = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      className="max-w-7xl grid md:grid-cols-2 grid-cols-1 gap-20 mx-auto my-14"
      data-aos="fade-up"
    >
      {/* Region-Wise Participants Table */}
      <div
        className="bg-white rounded-3xl shadow-2xl md:p-8 p-3 border border-prime relative"
        data-aos="fade-right"
      >
        <h2 className="md:text-2xl text-lg font-extrabold text-green-700 mb-7 font-parkinsans text-center tracking-wide">
          Regions-Wise Participants
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-prime text-white font-parkinsans">
                <th className="px-4 py-3 rounded-l-xl">Region</th>
                <th className="px-4 py-3">2024</th>
                <th className="px-4 py-3">2025</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3 rounded-r-xl">% of Total</th>
              </tr>
            </thead>
            <tbody>
              {regionData.map((row, idx) => (
                <tr
                  key={row.region}
                  className={`${idx % 2 === 0 ? "bg-green-50" : "bg-white"} hover:bg-emerald-50 text-start font-parkinsans transition`}
                >
                  <td className="px-4 py-3 font-semibold text-green-900">{row.region}</td>
                  <td className="px-4 py-3 text-center text-yellow-700 font-bold">{row.p2024}</td>
                  <td className="px-4 py-3 text-center text-green-700 font-bold">{row.p2025}</td>
                  <td className="px-4 py-3 text-center font-bold text-yellow-700">{row.total}</td>
                  <td className="px-4 py-3 font-bold">{row.percent}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Organization Type Table */}
      <div
        className="bg-white rounded-3xl shadow-2xl md:p-8 p-3 border border-yellow-700 relative"
        data-aos="fade-left"
      >
        <h2 className="md:text-2xl text-lg font-extrabold text-yellow-700 mb-7 font-parkinsans text-center tracking-wide">
          Organization Type and Participation
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-yellow-700 text-white font-parkinsans">
                <th className="px-4 py-3 rounded-l-xl">Organization Type</th>
                <th className="px-4 py-3">2024</th>
                <th className="px-4 py-3">2025</th>
                <th className="px-4 py-3">Total</th>
                <th className="py-3 rounded-r-xl">% of Total</th>
              </tr>
            </thead>
            <tbody>
              {orgData.map((row, idx) => (
                <tr
                  key={row.type}
                  className={`${idx % 2 === 0 ? "bg-yellow-50" : "bg-white"} hover:bg-yellow-100 font-parkinsans transition`}
                >
                  <td className="px-4 py-3 font-semibold text-yellow-800">{row.type}</td>
                  <td className="px-4 py-3 text-yellow-700 text-center font-bold">{row.p2024.toString().padStart(2, "0")}</td>
                  <td className="px-4 py-3 text-center text-prime font-bold">{row.p2025.toString().padStart(2, "0")}</td>
                  <td className="px-4 py-3 font-bold text-center text-prime">{row.total}</td>
                  <td className="px-4 py-3 text-center font-bold">{row.percent}%</td>
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

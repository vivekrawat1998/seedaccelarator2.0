import React from "react";

const multiYearSummary = [
  {
    year: 2022,
    segments: 5,
    states: 7,
    trials: 632,
    testVarieties: 26,
    benchmarkVarieties: 8,
    naresPartners: 17,
  },
  {
    year: 2023,
    segments: 5,
    states: 7,
    trials: 453,
    testVarieties: 74,
    benchmarkVarieties: 24,
    naresPartners: 21,
  },
  {
    year: 2024,
    segments: 5,
    states: 4,
    trials: 180,
    testVarieties: 31,
    benchmarkVarieties: 8,
    naresPartners: 8,
  },
];

const stateDistricts = [
  { state: "Bihar", districts: "Banka, Jehanabad, Patna, Rohtas" },
  {
    state: "Chhattisgarh",
    districts: "Bilaspur, Durg, Kabeerdham, Mahasamund, Raipur",
  },
  { state: "Jharkhand", districts: "Garhwa, Palamu" },
  {
    state: "Odisha",
    districts:
      "Bargarh, Ganjam, Khordha, Puri, Sundargarh, Sambalpur",
  },
  {
    state: "Telangana",
    districts:
      "Karimnagar, Warangal, Nalgonda, Mahbubnagar",
  },
  {
    state: "Uttar Pradesh",
    districts:
      "Chandauli, Ghazipur, Gorakhpur, Kaushambi, Kushinagar, Prayagraj, Siddharth Nagar, Varanasi",
  },
  {
    state: "West Bengal",
    districts:
      "Bankura, Cooch Behar, Hooghly, Howrah, Jalpaiguri, Nadia",
  },
];

export default function StatisticalAnalysisSection() {
  return (
    <section className="bg-white rounded-2xl font-parkinsans px-6 py-10 container mx-auto my-12 ">
      {/* Section Heading */}
      <h2 className="text-3xl font-bold mb-4 font-parkinsans text-green-800 text-center">
        Statistical Analysis
      </h2>
      <p className="mb-8 text-gray-700 font-Nunito text-center max-w-3xl mx-auto leading-relaxed">
        Quantitative traits were analyzed using a Mixed Linear Model (BLUP). Trial reliability was evaluated
        through broad-sense heritability (
        <span className="italic">
          H<sup>2</sup>
        </span>
        ) and coefficient of determination (
        <span className="italic">
          R<sup>2</sup>
        </span>
        ). Predicted values for each variable were tested for significance at
        the 95% confidence level.
      </p>

      {/* Image Section */}
      <h3 className="text-lg font-semibold mb-3 text-green-700 text-center">
        The KVK and NGO Network (2022–25)
      </h3>

      <div className="flex justify-center mb-10">
        <div className="w-full md:w-4/5 relative rounded-xl overflow-hidden shadow-xl group">
       
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded-lg shadow-md">
            <p className="text-green-900 font-semibold text-sm">
              Product Evaluation Network (2022–2025)
            </p>
          </div>
        </div>
      </div>

      {/* Multi-Year Table */}
      <h4 className="text-md font-semibold mb-3 text-green-700">
        Multi-Year OFT Summary
      </h4>

      <div className="overflow-x-auto mb-8">
        <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow-md">
          <thead className="bg-green-200">
            <tr>
              <th className="px-3 py-2 text-md font-bold text-green-900">Year</th>
              <th className="px-3 py-2 text-md font-bold text-green-900">Market Segments</th>
              <th className="px-3 py-2 text-md font-bold text-green-900">States</th>
              <th className="px-3 py-2 text-md font-bold text-green-900">No. Of Trials</th>
              <th className="px-3 py-2 text-md font-bold text-green-900">Test Varieties</th>
              <th className="px-3 py-2 text-md font-bold text-green-900">Benchmark Varieties</th>
              <th className="px-3 py-2 text-md font-bold text-green-900">NARES Partners</th>
            </tr>
          </thead>
          <tbody>
            {multiYearSummary.map((row) => (
              <tr
                key={row.year}
                className="odd:bg-green-50 even:bg-white hover:bg-green-100 transition-colors duration-200"
              >
                <td className="px-3 py-2 text-center">{row.year}</td>
                <td className="px-3 py-2 text-center">{row.segments}</td>
                <td className="px-3 py-2 text-center">{row.states}</td>
                <td className="px-3 py-2 text-center">{row.trials}</td>
                <td className="px-3 py-2 text-center">{row.testVarieties}</td>
                <td className="px-3 py-2 text-center">{row.benchmarkVarieties}</td>
                <td className="px-3 py-2 text-center">{row.naresPartners}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* State/Districts Summary */}
      <h4 className="text-md font-semibold my-3 text-green-700">
        State / Districts
      </h4>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow-md text-left">
          <thead>
            <tr className="bg-green-200">
              <th className="px-3 py-2 text-md font-bold text-green-900">State</th>
              <th className="px-3 py-2 text-md font-bold text-green-900">Districts</th>
            </tr>
          </thead>
          <tbody>
            {stateDistricts.map(({ state, districts }) => (
              <tr
                key={state}
                className="odd:bg-green-50 even:bg-white hover:bg-green-100 transition-colors duration-200"
              >
                <td className="px-3 py-2 font-medium text-green-900">
                  {state}
                </td>
                <td className="px-3 py-2">{districts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

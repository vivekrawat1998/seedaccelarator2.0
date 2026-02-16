import React from "react";

const breedingCenters = [
  "Central Rice Research Institute (CRRI), Cuttack",
  "Indian Agricultural Research Institute, New Delhi, Delhi",
  "Central Rainfed Upland Rice Research Station, Hazaribagh, Jharkhand",
  "Indian Rice Research Institute (IIRR), Hyderabad",
  "ICAR-Research Complex for Eastern Region, Patna",
  "Central Soil Salinity Research Institute, Karnal",
  "Odisha University of Agriculture and Technology, Bhubaneswar",
  "Acharya Narendra Deva University of Agriculture and Technology, Kumarganj, Ayodhya (Uttar Pradesh)",
  "Banaras Hindu University, Varanasi (Uttar Pradesh)",
  "Sam Higginbottom University of Agriculture, Technology and Sciences, Prayagraj (Uttar Pradesh)",
  "Bihar Agricultural University, Sabour (Bihar)",
  "Birsa Agricultural University, Ranchi (Jharkhand)",
  "Indira Gandhi Krishi Vishwavidyalaya, Raipur (Chhattisgarh)",
  "Uttar Banga Krishi Viswavidyalaya, Pundibari, Cooch Behar (West Bengal)",
  "Professor Jayashankar Telangana State Agricultural University, Hyderabad (Telangana)",
  "Anand Agricultural University, Anand, Gujarat"
];

export default function ProductInfoSection() {
  return (
    <section className="bg-white rounded-lg font-parkinsans  p-6 container mx-auto my-10">
      <h2 className="text-3xl font-bold  text-prime mb-2">
        Product Evaluation Information and Results
      </h2>
      <h3 className="text-lg font-medium font-Nunito text-gray-700 mb-6">
        (Farmer led and multi-location)
      </h3>

      <div className="mb-6">
        <h4 className="text-xl font-parkinsans font-semibold text-green-700 mb-3">
          About multi-location adaptive trials
        </h4>
        <p className="text-gray-700 font-Nunito leading-relaxed mb-2">
          Every year, IRRI invites new-variety nomination (recently released) from national breeding centers in prescribed template. Once the varietal nominations from different breeders are received, those are categorized under preferred market segments.
        </p>
        <div className="bg-green-50 font-parkinsans border-l-4 border-green-600 text-green-800 rounded-lg p-4 my-4">
          Based on the seeds availability and relevance of the varieties in target market segments and geography, nominations are finalized and put to test under adaptive trials (OFT).
        </div>
        <p className="text-gray-700 font-Nunito leading-relaxed mb-2">
          Through various years of evolution and diverse designs and lay-outs exercised to run these trials, these are popularly known as H2H(Head to Head), TRICOTs (Tradic trials), OFTs (On-farm trials) or adaptive trials.
        </p>
        <p className="text-gray-700 font-Nunito leading-relaxed mb-2">
          These multi-location trials are primarily designed using TRICOT principles, to compare nearly 3-4 new rice varieties with local checks and established benchmarks under the associated market segment. Managed directly by farmers under real-world conditions, adaptive trials provide realistic estimates of genetic gain under farmer managed conditions and capture variability and average productivity in a more significant manner.
        </p>
        <div className="bg-gray-50 border-l-4 font-Nunito border-gray-400 text-gray-800 rounded-lg p-4 my-4">
          Results guide in evidence-based decisions on product positioning and scaling of varieties.
        </div>
      </div>

      <h4 className="md:text-xl text-lg font-parkinsans font-bold text-green-700 mb-4">
        Breeding centers nominated varieties so far
      </h4>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white rounded text-left shadow">
          <thead className="bg-green-800">
            <tr>
              <th className="px-4 py-2 text-md text-white font-bold">S.No</th>
              <th className="px-4 py-2 text-md text-white font-bold">Breeding Institutes</th>
            </tr>
          </thead>
          <tbody>
            {breedingCenters.map((center, i) => (
              <tr key={center} className="odd:bg-green-50 font-parkinsans even:bg-white">
                <td className="px-4 py-2 font-medium text-green-900">{i + 1}</td>
                <td className="px-4 py-2">{center}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

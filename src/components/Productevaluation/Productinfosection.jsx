import React from "react";
import Typography from "../../ui/Heading";

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
    <section className="bg-white mt-10 rounded-lg ">
      <Typography variant="h1">
        Product Evaluation Information and Results
      </Typography>

      <Typography variant="h2" className="mb-4">
        (Farmer led and multi-location)
      </Typography>

      <div className="mt-10">
        <Typography variant="h1">
          About multi-location adaptive trials
        </Typography>
        <Typography variant='h3 ' className='mt-2 mb-5'>
          Every year, IRRI invites new-variety nomination (recently released) from national breeding centers in prescribed template. Once the varietal nominations from different breeders are received, those are categorized under preferred market segments.
        </Typography>

        <div className="bg-green-50 font-parkinsans border-l-4 border-green-600 text-green-800 rounded-lg mt-10 p-4 mb-10">
          <Typography variant="h2">
            Based on the seeds availability and relevance of the varieties in target market segments and geography, nominations are finalized and put to test under adaptive trials (OFT).
          </Typography>
        </div>

        <Typography variant="h3">
          Through various years of evolution and diverse designs and lay-outs exercised to run these trials, these are popularly known as H2H(Head to Head), TRICOTs (Tradic trials), OFTs (On-farm trials) or adaptive trials.
        </Typography>
        <br />

        <Typography variant="h3">
          These multi-location trials are primarily designed using TRICOT principles, to compare nearly 3-4 new rice varieties with local checks and established benchmarks under the associated market segment. Managed directly by farmers under real-world conditions, adaptive trials provide realistic estimates of genetic gain under farmer managed conditions and capture variability and average productivity in a more significant manner.
        </Typography>


        <div className="bg-gray-50 border-l-4 font-Nunito border-gray-400 text-gray-800 rounded-lg p-4 mt-10 ">
          <Typography variant="h2">
            Results guide in evidence-based decisions on product positioning and scaling of varieties.
          </Typography>
        </div>
      </div>

      <Typography variant="h1" className="mt-10 mb-5">
        Breeding centers nominated varieties so far
      </Typography>
     
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
                <td className="px-4 py-2 font-Karla font-medium text-green-900">{i + 1}</td>
                <td className="px-4 py-2 font-Karla">{center}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

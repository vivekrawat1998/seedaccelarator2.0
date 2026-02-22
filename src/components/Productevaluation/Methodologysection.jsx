import React from "react";
import Typography from "../../ui/Heading";

const stripTrialImg = "/mythodology.png";
const trialIconImg = "/OFT trials-India.jpeg";

export default function MethodologySection() {
  return (
    <section className="bg-white rounded-lg mt-10">
      <Typography variant="h1" className="mb-5">
        Methodology
      </Typography>
      <Typography variant="h2" className="mb-5">
        Each year, breeders and NARES partners nominate new rice varieties for testing across India.
        These are grouped into five market segments
        <span className="font-semibold text-green-700">(TEMS-I, TMeLS-R, TLaSF-R, DELS-R, DMeLS-R)</span>.
      </Typography>
      <div className="mb-4">
        <Typography variant="p">
          Trial sets are tested at ≥15 sites per state, ensuring site-specific needs are covered.
          Best performers from previous seasons are retained in the pool. Allocations are randomized, and KVKs and other extension partners coordinate implementation.
          Farmers receive seed kits and support before sowing, and partners undergo training to ensure standardized trial management.
        </Typography>
      </div>
      <div className="bg-blue-50 border-l-4 border-blue-600 text-blue-900 rounded-lg p-4 mb-6">
        <Typography variant="h2" >Statistical Analysis</Typography>
        <Typography variant="p" >
          Quantitative traits were analyzed using a Mixed Linear Model (BLUP). Trial reliability was evaluated through broad-sense heritability (H2) and coefficient of determination (R2). Predicted values for each variable were tested for significance at the 95% confidence level.
        </Typography>
      </div>
      <div className="bg-green-50 border-l-4 border-green-600 text-green-900 rounded-lg p-4 mb-4">
        <Typography variant="h2" className="font-semibold mb-1 font-parkinsans">Transplanted Trials</Typography>
        <Typography variant="p" >
          Transplanting was ensured at 18–20 days after sowing (DAS) for early maturity market segments,
          25–30 DAS for medium maturity, and 30–35 DAS for late maturity. Each variety was transplanted on 200 sqm, with uniform nutrient management across replications and a seed rate of 40 kg/ha.
        </Typography>
      </div>
      <div className="bg-yellow-50 border-l-4 border-yellow-600 text-yellow-900 rounded-lg p-4 mb-6">
        <Typography variant="h2" >DSR Trials</Typography>
        <Typography variant="p" >
          In DSR trials, dry DSR was adopted with pre-treated seed drilled using precision planters on approximately 500 sqm plots.
          Sowing used 25 kg/ha for hybrids, 40 kg/ha for HYVs at 2–3 cm depth. Light irrigation followed sowing; 1–2 additional irrigations were given in highly drought soils.
          Moisture was maintained during key stages (tillering, panicle initiation, grain filling).
          Standard herbicides and site-specific weed management were applied.
        </Typography>
      </div>
      <div className="bg-white rounded-lg md:p-6 mb-6 flex flex-col md:flex-row items-center gap-6">
        <div className=" flex justify-center">
          <img
            src={trialIconImg}
            alt="Trial Icon"
            className="w-full md:h-[70vh] object-cover rounded-lg shadow-md"
          />
        </div>

        <div className=" flex flex-col items-center">
          <img
            src={stripTrialImg}
            alt="Layout of strip trial (On Farm Trial)"
            className="max-w-full h-auto mb-3 rounded-lg shadow-lg"
          />
          <div className="w-full max-w-5xl mx-auto">
            <Typography variant="h1" className="text-md font-bold mb-1 text-prime font-parkinsans">Traits</Typography>
            <Typography variant="h3" >
              Phenotypic data on traits - tillering, plant height, panicle length, grains per panicle, spikelet fertility, test weight, and pests and diseases - are collected.
              For DSR segments, anaerobic germination and emergence (10 DAS), vegetative vigour (15 DAS), and canopy cover (30 DAS), along with nematode infestation are recorded.
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
}

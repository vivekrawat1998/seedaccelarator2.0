import React from "react";

const stripTrialImg = "/mythodology.png";
const trialIconImg = "/OFT trials-India.jpeg";

export default function MethodologySection() {
  return (
    <section className="bg-white rounded-lg md:px-4 px-3 py-8 container mx-auto my-10">
      <h2 className="text-2xl font-bold text-prime font-parkinsans mb-4">Methodology</h2>
      <p className="mb-3 font-Nunito text-gray-700">
        Each year, breeders and NARES partners nominate new rice varieties for testing across India.
        These are grouped into five market segments
        <span className="font-semibold text-green-700">(TEMS-I, TMeLS-R, TLaSF-R, DELS-R, DMeLS-R)</span>.
      </p>
      <div className="mb-4">
        <p className="text-gray-700 mb-2 font-Nunito">
          Trial sets are tested at ≥15 sites per state, ensuring site-specific needs are covered.
          Best performers from previous seasons are retained in the pool. Allocations are randomized, and KVKs and other extension partners coordinate implementation.
          Farmers receive seed kits and support before sowing, and partners undergo training to ensure standardized trial management.
        </p>
      </div>
      <div className="bg-blue-50 border-l-4 border-blue-600 text-blue-900 rounded-lg p-4 mb-6">
        <h3 className="font-semibold font-parkinsans mb-1">Statistical Analysis</h3>
        <p className="font-Nunito text-gray-700">
          Quantitative traits were analyzed using a Mixed Linear Model (BLUP). Trial reliability was evaluated through broad-sense heritability (H2) and coefficient of determination (R2). Predicted values for each variable were tested for significance at the 95% confidence level.
        </p>
      </div>
      <div className="bg-green-50 border-l-4 border-green-600 text-green-900 rounded-lg p-4 mb-4">
        <h3 className="font-semibold mb-1 font-parkinsans">Transplanted Trials</h3>
        <p className="font-Nunito text-gray-700">
          Transplanting was ensured at 18–20 days after sowing (DAS) for early maturity market segments,
          25–30 DAS for medium maturity, and 30–35 DAS for late maturity. Each variety was transplanted on 200 sqm, with uniform nutrient management across replications and a seed rate of 40 kg/ha.
        </p>
      </div>
      <div className="bg-yellow-50 border-l-4 border-yellow-600 text-yellow-900 rounded-lg p-4 mb-6">
        <h3 className="font-semibold font-parkinsans mb-1">DSR Trials</h3>
        <p className="font-Nunito">
          In DSR trials, dry DSR was adopted with pre-treated seed drilled using precision planters on approximately 500 sqm plots.
          Sowing used 25 kg/ha for hybrids, 40 kg/ha for HYVs at 2–3 cm depth. Light irrigation followed sowing; 1–2 additional irrigations were given in highly drought soils.
          Moisture was maintained during key stages (tillering, panicle initiation, grain filling).
          Standard herbicides and site-specific weed management were applied.
        </p>
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
            <h5 className="text-md font-bold mb-1 text-prime font-parkinsans">Traits</h5>
            <p className="text-gray-700 text-base font-Nunito leading-relaxed">
              Phenotypic data on traits - tillering, plant height, panicle length, grains per panicle, spikelet fertility, test weight, and pests and diseases - are collected.
              For DSR segments, anaerobic germination and emergence (10 DAS), vegetative vigour (15 DAS), and canopy cover (30 DAS), along with nematode infestation are recorded.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

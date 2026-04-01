import React from "react";
import Typography from "../../ui/Heading";

const stripTrialImg = "/mythodology.png";
const trialIconImg = "/OFT trials-India.jpeg";

export default function MethodologySection() {
  return (
    <section className="bg-white rounded-lg mt-20">
      <Typography variant="h1" className="mb-5">
        Methodology
      </Typography>
      <Typography variant="h3" className="mb-5">
        Each year, breeders and NARES partners nominate new rice varieties for testing across India.
        These are grouped into five market segments -
        <br />
        <span className="font-semibold text-green-700"> TEMS-I, TMeLS-R, TLaSF-R, DELS-R and DMeLS-R</span>
      </Typography>



      <div className="mb-4">
        <Typography variant="h3">
          Trial sets are tested at ≥15 sites per state, ensuring site-specific needs are covered.
          Best performers from previous seasons are retained in the pool. Allocations are randomized, and KVKs and other extension partners coordinate implementation.
          Farmers receive seed kits and support before sowing, and partners undergo training to ensure standardized trial management.
        </Typography>
      </div>
      <div className="bg-prime/10 border-l-4 border-yellow-400 text-black rounded-lg p-4 mb-6">
        <Typography variant="h2" className="tracking-[2px]" >Statistical Analysis</Typography>
        <Typography variant="h3" >
          Quantitative traits are analyzed using a Mixed Linear Model (BLUP). Trial reliability is evaluated through broad-sense heritability (H²) and coefficient of determination (R²). Predicted values for each variable are tested for significance at  95% confidence level.
        </Typography>
      </div>
      <div className="bg-prime/10  border-l-4 border-yellow-400 text-black rounded-lg p-4 mb-4">
        <Typography variant="h2" className="font-semibold mb-1 tracking-[2px] font-parkinsans">Transplanted Trials</Typography>
        <Typography variant="h3" >
          Transplanting is ensured at 18–20 days after sowing (DAS) for early maturity market segments,
          25–30 DAS for medium maturity, and 30–35 DAS for late maturity. Each variety is transplanted on 200 sqm area, with uniform nutrient management across replications and a seed rate of 40 kg/ha.
        </Typography>
      </div>
      <div className="bg-prime/10 border-l-4 border-yellow-400 text-black rounded-lg p-4 mb-6">
        <Typography variant="h2" className="tracking-[2px]" >DSR Trials</Typography>
        <Typography variant="h3" >
          In DSR trials, dry direct-seeded rice is established using pre-treated seed, precision-drilled into ~500 m² plots. Seed rates are 25 kg/ha for hybrids and 40 kg/ha for HYVs, sown at a depth of 2–3 cm. A light irrigation is applied immediately after sowing, with 1–2 additional irrigations in drought-prone soils. Soil moisture is maintained during critical growth stages—tillering, panicle initiation, and grain filling. Standard herbicides and site-specific weed management practices are implemented.
        </Typography>
      </div>
      <div className="bg-white rounded-lg mt-20 mb-6 overflow-hidden">

        {/* ===== IMAGE SECTION ===== */}
        <div className="flex flex-col lg:flex-row gap-6 items-center">

          {/* Image 1 */}
          <img
            src={trialIconImg}
            alt="Trial Icon"
            className="w-full lg:w-1/2 h-[250px] sm:h-[350px] lg:h-[70vh] object-cover rounded-lg shadow-md"
          />

          {/* Image 2 */}
          <img
            src={stripTrialImg}
            alt="Layout of strip trial (On Farm Trial)"
            className="w-full lg:w-1/2 h-[250px] sm:h-[350px] lg:h-[70vh] object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* ===== TEXT SECTION ===== */}
        <div className="mt-8">
          <div className="w-full  mx-auto text-center lg:text-left">

            <Typography
              variant="h1"
              className="text-lg sm:text-xl font-bold mb-2 text-black "
            >
              Traits
            </Typography>

            <Typography
              variant="h3"
              className="text-sm sm:text-base leading-relaxed font-Karla"
            >
              Phenotypic data on traits (tillering, plant height, panicle length,
              grains per panicle, spikelet fertility, test weight, and pests and
              diseases) are collected. For DSR segments, anaerobic germination and
              emergence (10 DAS), vegetative vigour (15 DAS), and canopy cover (30
              DAS), along with nematode infestation are recorded.
            </Typography>

          </div>
        </div>
      </div>
    </section >
  );
}

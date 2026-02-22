import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Typography from "../../ui/Heading";

export default function VarietalTurnoverImpact() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <div className="bg-white container mx-auto py-16 px-6 grid place-items-center">
      {/* Chart Section */}
      <div className="flex-1 w-full max-w-xl flex items-star gap-5 justify-center mb-8 md:mb-0" data-aos="fade-left">
        {/* Replace with your actual chart image path */}
        <img 
          src="/impactstories.png"
          alt="WAVA (2015-23) Chart"
          className="w-full  rounded shadow-2xl border border-green-200"
        />
        <img 
          src="/WAVA.JPG"
          alt="WAVA (2015-23) Chart"
          className="w-full  rounded shadow-2xl border border-green-200"
        />
      </div>
      {/* Text Section */}
      <div className="flex-1 font-Nunito  mt-10" data-aos="fade-right">
        <Typography variant="h1" >
          Impact on Varietal Turnover
        </Typography>
        <p className="mb-4 mt-5 text-gray-900 text-base font-Karla leading-relaxed">
          The graph shows the <span className="font-bold text-prime font-Karla ">Weighted Average Varietal Age (WAVA) in India between 2015 and 2023</span>, highlighting how varietal turnover has gradually improved over time. In 2015, the WAVA stood at <span  className="font-bold text-prime font-Nunito">15.13 years</span>, reflecting the dominance of older varieties in farmers’ fields. This value increased slightly in 2016 but showed a sharp decline to <span className="font-bold text-prime font-Nunito">11.11 years in 2017</span>, indicating the infusion of newer varieties. This illustrates the Weighted Average Varietal Age (WAVA) in India from 2015 to 2023, demonstrating a gradual improvement in varietal turnover. By 2023, it settled at <span className="font-bold text-green-700 text-prime font-Nunito">12.86 years</span>, reflecting a steady improvement in varietal turnover compared to the earlier years.
        </p>
        <p className="mb-4 textc-gray-900 font-Karla text-base leading-relaxed">
          This positive trend is closely linked to the role of the <span className="font-bold text-prime font-parkinsans text-green-700">Seed Accelerator Network (SAN)</span>, which has strategically collaborated with national partners to test, release, and scale improved varieties. By addressing bottlenecks in varietal evaluation, seed multiplication, and delivery systems, SAN has accelerated the adoption of newer, high-yielding, and resilient rice varieties. The gradual reduction in WAVA is a strong indicator that farmers are increasingly accessing and planting improved seeds, rather than relying on older varieties.
        </p>
        <Typography variant="h2" className="mt-8 border-l-4 border-green-700 pl-4 bg-green-50 p-3 font-bold font-karla text-lg" data-aos="fade-up">
          In essence, this reduction in varietal age is a <span className="font-bold">key outcome of SAN’s interventions</span>, reflecting its success in promoting varietal replacement and ensuring that the benefits of modern rice breeding reach farmers in a timely manner.
        </Typography>
      </div>
    </div>
  );
}

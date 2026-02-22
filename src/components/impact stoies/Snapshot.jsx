import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Typography from "../../ui/Heading";

const snapshotImg = "/hero1.jpg";

export default function VarietiesScalingSnapshot() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <div className="min-h-screen mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-12">
      {/* Left Image Block */}
      <div
        className="mb-8 md:mb-0 md:mr-10 flex-shrink-0 w-full  rounded overflow-hidden shadow-lg border border-green-700 bg-white flex items-center justify-center"
        data-aos="fade-right"
      >
        <img
          src={snapshotImg}
          alt="Snapshot"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Main Card */}
      <div
        className="w-full max-w-3xl bg-white border border-green-700 rounded shadow-lg px-6 md:px-12 py-8 mb-8 md:mb-0"
        data-aos="zoom-in"
      >
        <Typography data-aos="fade-up" variant="h1" className='mb-5'>

          Varieties and Scaling Snapshot
        </Typography>

        <ul className="text-gray-800 font-Karla space-y-4 text-base md:text-lg">
          <li data-aos="fade-right" className="leading-relaxed">
            <span className="text-green-700 font-bold">●</span>{" "}
            5 million ha in India under STRVs (drought, submergence, salinity, healthier rice).
          </li>
          <li data-aos="fade-left" className="leading-relaxed">
            <span className="text-green-700 font-bold">●</span>{" "}
            32 improved varieties are being integrated into national seed chains.
          </li>
          <li data-aos="fade-right" className="leading-relaxed">
            <span className="text-green-700 font-bold">●</span>{" "}
            An average yield advantage of 0.4 t/ha.
          </li>
          <li data-aos="fade-left" className="leading-relaxed">
            <span className="text-green-700 font-bold">●</span>{" "}
            ~15,000 small holders trained in seed production.
          </li>
          <li data-aos="fade-right" className="leading-relaxed">
            <span className="text-green-700 font-bold">●</span>{" "}
            ~15,000 MT of quality seed through the seed network convergence.
          </li>
          <li data-aos="fade-left" className="leading-relaxed">
            <span className="text-green-700 font-bold">●</span>{" "}
            ~322 MT EGS to SSCs and SAUs.
          </li>
          <li data-aos="fade-right" className="leading-relaxed">
            <span className="text-green-700 font-bold">●</span>{" "}
            Strengthening Kalanamak value chain - through SHGs.
          </li>
          <li data-aos="fade-left" className="leading-relaxed">
            <span className="text-green-700 font-bold">●</span>{" "}
            180 rice landraces in Odisha are being evaluated for the best accessions and seed system development.
          </li>
        </ul>
      </div>


    </div>
  );
}

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import mapImg from "/logo/map (1).png"; // Adjust this path as per your setup
import Typography from "../../ui/Heading";

const NetworkMembersHero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      className="max-w-6xl mx-auto my-14 flex flex-col md:flex-row items-center gap-14 px-4"
      data-aos="fade-up"
    >
      {/* Left: Image */}
      <div
        className="w-full md:w-1/2 flex justify-center"
        data-aos="fade-right"
        data-aos-delay="100"
      >
        <div className="bg-white backdrop-blur-md transition-transform duration-300 hover:scale-105 hover:shadow-green-200/50 p-2 md:p-6">
          <img
            src={mapImg}
            alt="SAN Network Members Map"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
      {/* Right: Text */}
      <div
        className="w-full md:w-1/2 text-[20px] flex flex-col justify-center items-start"
        data-aos="fade-left"
        data-aos-delay="200"
      >

        <p className=" text-gray-700 text-[26px] font-Karla mb-4">
          Spanning India’s diverse ecosystems and fostering innovation through collaboration for resilient seed systems.
        </p>
        <ul className="mt-3 pl-5 text-gray-800 font-Karla space-y-2 list-disc">
          <li>
            <span className="font-semibold text-green-700">Inclusive representation</span>  from all regions of India
          </li>
          <li>
            <span className="font-semibold text-emerald-700">Stakeholders</span>  include FPCs, KVKs, NGOs, seed companies, universities, and other key institutions
          </li>
          <li>
            <span className="font-semibold text-green-700">Partnership-driven efforts</span>  for locally adapted seed systems
          </li>
        </ul>
      </div>
    </section>
  );
};

export default NetworkMembersHero;

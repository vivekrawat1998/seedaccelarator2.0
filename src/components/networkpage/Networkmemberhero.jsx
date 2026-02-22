import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import mapImg from "/our work.png"; // Adjust this path as per your setup
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
            className="w-full max-w-md object-contain"
            loading="lazy"
          />
        </div>
      </div>
      {/* Right: Text */}
      <div
        className="w-full md:w-1/2 flex flex-col justify-center items-start"
        data-aos="fade-left"
        data-aos-delay="200"
      >
      
        <Typography variant="h1" className="text-4xl md:text-5xl font-extrabold bg-prime font-Karla text-transparent bg-clip-text drop-shadow-lg mb-4 animate-fadein">
          SAN <span className="text-gray-900"> Network Participants</span>
        </Typography>
        <p className=" text-gray-700 font-Karla mb-4">
          Spanning India’s diverse ecosystems, fostering innovation through collaboration for resilient seed systems.
        </p>
        <ul className="mt-3 pl-5 text-gray-800 font-Karla space-y-2 list-disc">
          <li>
            <span className="font-semibold text-green-700">Representation</span> across all regions of India
          </li>
          <li>
            <span className="font-semibold text-emerald-700">Organizations</span> include FPCs, KVKs, NGOs, seed companies, universities, and more
          </li>
          <li>
            <span className="font-semibold text-yellow-700">Collaborative projects</span> driving sustainable agriculture
          </li>
        </ul>
      </div>
    </section>
  );
};

export default NetworkMembersHero;

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

import collageImg from "/banner/Homepage Sec 2 (3).png"; // 👈 your uploaded image

const AboutSection = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

        {/* ================= LEFT IMAGE ================= */}
        <div data-aos="fade-right">
          <img
            src={collageImg}
            alt="SAN Network"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div data-aos="fade-left ">
       

          <p className="text-gray-700 font-Karla text-lg leading-relaxed mb-4">
            The Seed Accelerator Network (SAN) is an institutional platform developed under the Seed Systems and Product Management (SSPM) unit at IRRI to strengthen adaptive testing, scaling, and adoption of improved rice varieties across South Asia.

          </p>

          <p className="text-gray-700 font-Karla text-lg leading-relaxed mb-6">
            SAN addresses key challenges in varietal turnover and seed dissemination by connecting breeders, seed enterprises, and farmers through evidence-based field validation and market-oriented approaches.
          </p>

          <Link
            to="/about"
            className="inline-flex text-[16px] items-center rounded gap-2 bg-green-700 text-white font-semibold px-7 py-3 shadow hover:bg-green-800 transition"
          >
            Know More About Us →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
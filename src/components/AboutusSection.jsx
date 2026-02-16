import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import profileBg from '/Member Network page .JPG'

const AboutSection = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="container mx-auto px-4  gap-12 items-center">
        {/* TEXT BLOCK */}
        <div
          className=""
          data-aos="fade-left"
        >
          <h2 className="text-3xl md:text-5xl font-parkinsans text-center  font-bold text-gray-900 mb-10 ">
            About Seed Accelerator Network (SAN)
          </h2>
          <img
            src="/SAM_3.JPG"
            alt="Seed Accelerator Network field activity"
            className="w-full h-[60vh] rounded object-cover"
          />

          <p className="text-gray-700 max-w-5xl font-Karla text-md leading-relaxed mt-5 mb-5">
            The Seed Accelerator Network (SAN) is an institutional platform
            developed under the Seed Systems and Product Management (SSPM) unit
            at IRRI to strengthen adaptive testing, scaling, and adoption of
            improved rice varieties across South Asia.
          </p>


          <img
            src={profileBg}
            alt="Seed Accelerator Network farmer interaction"
            className="w-full h-[60vh] rounded object-cover"
          />
          <p className="text-gray-700 max-w-5xl font-Karla text-md leading-relaxed mt-5">
            SAN addresses key challenges in varietal turnover and seed
            dissemination by connecting breeders, seed enterprises, and farmers
            through evidence-based field validation and market-oriented
            approaches.
          </p>
          <div className="w-full grid place-items-center mt-10">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 font-Karla bg-green-700 text-white font-semibold px-7 py-3  shadow hover:bg-green-800 transition"
            >
              Know More
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

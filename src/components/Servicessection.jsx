import React, { useState } from "react";
import Lottie from "lottie-react";
import nursingCareAnim from "../utils/Doctor, Medical, Surgeon, Healthcare Animation (1).json";
import physioAnim from "../utils/YDJcoNEkPv.json";
import equipmentAnim from "../utils/HealthCare Animation.json";
import healthcare from "../utils/Doctor check.json";
import nutrition from "../utils/Nutrition.json";
import yoga from "../utils/Developer_Yoga.json";
import LifestyleModification from "../utils/Lifestyle.json";

const services = [
  {
    icon: physioAnim,
    title: "Physiotherapy",
    desc: "Expert physiotherapists help with rehabilitation, pain management, and recovery at your doorstep.",
  },
  {
    icon: nursingCareAnim,
    title: "Nursing Care",
    desc: "Experienced nurses providing monitoring, wound care, injections, and more—all in your home.",
  },
  {
    icon: equipmentAnim,
    title: "Medical & Surgical Equipments",
    desc: "Compassionate support for personal care, feeding, mobility, and daily tasks.",
  },
  {
    icon: healthcare,
    title: "Lab Test",
    desc: "Convenient delivery and setup of vital medical equipment, including beds, oxygen, monitors, and more.",
  },
  {
    icon: nutrition,
    title: "Nutrition & Diet",
    desc: "Specialized postnatal care and newborn support for healthy mothers and happy babies.",
  },
  {
    icon: yoga,
    title: "Yoga & Wellness",
    desc: "Personalized programs and guidance to support safer, healthier lifestyles and mindful well-being.",
  },
  {
    icon: LifestyleModification,
    title: "Lifestyle Modification & Wellness",
    desc: "Guidance for sustainable lifestyle habits, disease prevention, stress management, and holistic wellness.",
  },
];

const ServicesSection = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleServices = showAll ? services : services.slice(0, 6);

  return (
    <section className="relative bg-[#f5fdff] font-parkinsans pb-16 pt-12">
      <div className="py-8 relative z-10">
        <div className="text-center mb-3">
          <span
            className="backdrop-blur-xl shadow-lg rounded-full px-5 py-2 inline-block"
            style={{
              background: "rgba(37,138,185,0.10)",
            }}
          >
            <h1 className="text-[#258ab9]">We bring care to your home</h1>
          </span>
        </div>
        <h2 className="text-[30px] font-Nunito text-[#122c3a] font-bold text-center mb-10">
          Medical Services Offered <span className="text-secondary font-extrabold"> At Home </span>
        </h2>
        <div className="flex flex-wrap gap-5 md:px-0 px-3 justify-center">
          {visibleServices.map((service, idx) => (
            <ServiceCard key={service.title + idx} {...service} />
          ))}
        </div>
        {!showAll && services.length > 6 && (
          <div className="flex justify-center mt-8">
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg font-Nunito text-lg shadow transition"
              onClick={() => setShowAll(true)}
            >
              View More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;

function ServiceCard({ icon, title, desc }) {
  return (
    <div className="flex-shrink-0 bg-white font-parkinsans rounded-2xl shadow-sm md:p-7 p-3 py-4 flex items-center gap-7 w-full md:w-[360px] xl:w-[410px]">
      <div className="shrink-0 grid place-items-center rounded-xl w-32 h-32 overflow-hidden">
        <Lottie
          animationData={icon}
          loop
          autoplay
          className="w-32 h-32"
        />
      </div>
      <div className="grid place-items-start w-full">
        <h3 className="font-bold text-md md:text-xl font-Nunito md:leading-6 mb-1 text-[#122c3a]">
          {title}
        </h3>
        <p className="text-gray-700 font-opensans text-[13px] leading-snug">{desc}</p>
        <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 mt-4 rounded-md text-white font-Nunito font-extrabold transition">
          Consult Now
        </button>
      </div>
    </div>
  );
}

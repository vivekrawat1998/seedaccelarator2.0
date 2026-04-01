import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FieldImg from '/banner/Our journey (1).png';
import TeamImg from '/About/Core Purpose.png';
import { Link } from 'react-router-dom';
import Typography from "../../ui/Heading";

import {
  Network,
  BarChart3,
  Folder,
  TrendingUp,
  Users,
  HandHeart,
  ClipboardList
} from "lucide-react";

const icons = [
  Network,
  BarChart3,
  Folder,
  TrendingUp,
  Users,
  HandHeart,
  ClipboardList
];

// ✅ IMPORTANT: 7 images for 7 objectives
const bgImages = [
  "/objective/1.png",
  "/objective/2.png",
  "/objective/3.png",
  "/objective/4.png",
  "/objective/5.png",
  "/objective/6.png",
];

const objectives = [
  "Create a network of seed scaling and accelerator agencies - public, private, and farmer collectives.",
  "Share findings from adaptive confirmatory trials conducted in farmers’ fields for newer rice varieties, highlighting their benefits.",
  "Create data-driven evidence and information access, strengthening breeder-scaler linkages for early generation seeds and commercial seed production and scaling.",
  "Fast-track varietal turnover by promoting timely dissemination of high-yielding, climate-resilient rice varieties and supporting product lifecycle management.",
  "Strengthen seed systems through improved stakeholder coordination and foster public-private partnership.",
  "Support community-led seed enterprises in building robust seed business models and market linkages.",
];

const AboutSAN = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden text-gray-800">

      {/* Journey Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1" data-aos="fade-right">
            <img src={FieldImg} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="order-1 lg:order-2 space-y-6" data-aos="fade-left">
            <Typography variant="h1"><span className="text-black">Our </span>

              Journey</Typography>
            <Typography variant="h3">
              India’s rice sector is transforming rapidly, but slow adoption of new, climate-resilient varieties limits progress for millions of farmers. Outdated seeds persist due to low awareness and poor accessibility, especially among smallholders. Bridging this gap is essential for food security, climate resilience, and rural prosperity.
              <br />
              <br />
              The <span className='font-bold'>Seed Accelerator Network</span> (SAN), initiated by the Seed Systems and Product Management unit at IRRI, unites public and private seed institutions, farmer collectives, and research bodies. SAN accelerates the journey of improved rice varieties from research to farmer fields, fostering collaborations and sharing knowledge to drive sustainable sector growth.
            </Typography>
          </div>
        </div>
      </section>

      {/* Core Purpose */}
      <section className="py-20 bg-white">
        <div className="relative mx-auto">

          {/* Background */}
          <div className="relative py-10 w-full">
            <img
              src={TeamImg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>

            <div className="relative py-20 z-10 text-center">
              <h1 className="text-white font-Nunito tracking-[3px]  leading-[52px] mb-5 text-[60px] font-bold">
                Core <span className="text-[#199b6a]">Purpose</span>
              </h1>
              <p className='text-white font-Karla text-lg max-w-3xl mx-auto'>Catalyze collaboration among diverse stakeholders, foster partnerships, and advance systematic data and evidence sharing to improve seed delivery and adoption.</p>
            </div>
          </div>

          {/* Objectives */}
          <div data-aos="fade-up" className=" mt-10 max-w-7xl mx-auto text-center">
            <Typography variant="h1">
              <span className='text-black'>Our </span>
              Objectives</Typography>

            <div className="mt-16 flex flex-wrap justify-center gap-12">

              {objectives.map((objective, idx) => {
                const Icon = icons[idx];

                return (
                  <div key={idx} className="relative w-[340px]  h-[500px] overflow-hidden">

                    {/* Card */}
                    <div className="">

                      {/* ✅ TEXT AREA WITH IMAGE BACKGROUND ONLY */}
                      <div
                        className="relative h-[650px] top-5 flex items-center justify-center text-center bg-cover bg-center"
                        style={{ backgroundImage: `url(${bgImages[idx]})` }}
                      >

                        {/* Text */}
                        <div className="relative z-10 p-5">
                          <p className="text-white font-Karla text-sm md:text-base text-center px-4 ">
                            {objective}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        </div>
      </section>
      <section className="">
        <img className='w-full h-full object-cover' src='/objective/Quote.jpg (1).jpeg' alt='quote' />
      </section>

      {/* CTA */}
      <section className="py-16 w-full text-center">
        <Typography variant="h1"><span className='text-black'>Join the </span> Network</Typography>

        <p className='font-Karla max-w-3xl mb-10 mx-auto'>SAN welcomes voluntary participation from seed corporations, research organizations, farmer producer companies, NGOs, and private sector innovators.</p>
        <Link
          to="/contact"
          className="bg-green-600 mt-5 font-bold text-white px-8 py-3 rounded-xl"
        >
          Contact Us
        </Link>
      </section>

    </div>
  );
};

export default AboutSAN;
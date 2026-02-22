import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FieldImg from '/field 2.png';
import TeamImg from '/IMG-20210201-WA0055.jpg';
import TeamImg1 from '/DSC_0048.JPG';
import { Link } from 'react-router-dom';
import Typography from "../../ui/Heading"

const objectives = [
  "Create a network of all seed scaling and accelerator agencies—public, private, and farmer collectives.",
  "Share findings from adaptive confirmatory trials conducted with farmers for newer rice varieties, highlighting their benefits.",
  "Create data-driven evidence and information access, strengthening developer–scaler linkages for early generation and commercial seed production and scaling.",
  "Fast-track varietal turnover by promoting timely dissemination of high-yielding, climate-resilient rice varieties and supporting product lifecycle management.",
  "Strengthen seed systems through improved stakeholder coordination and foster public–private partnership.",
  "Support community-led seed enterprises in building robust seed business models and market linkages.",
  "Generate evidence and insights to guide policies on varietal deployment and seed system strengthening."
];

const AboutSAN = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden text-gray-800">

      {/* Journey Section - Text Right, Image Left */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1" data-aos="fade-right" data-aos-delay="100">
            <img
              src={FieldImg}
              alt="Rice Field Innovation"
              className="w-full h-80 lg:h-96 rounded shadow-2xl object-cover"
            />
          </div>
          <div className="order-1 space-y-6  lg:order-2" data-aos="fade-left" data-aos-delay="200">
            <Typography variant="h1">
              Our Journey
            </Typography>
            <Typography variant="h3">
              India's rice sector is transforming rapidly, but slow adoption of new, climate-resilient varieties limits progress for millions of farmers.
            </Typography>
            <Typography variant="h3" className='mt-5'>
              The <span className="font-bold text-green-900">Seed Accelerator Network</span> (SAN), initiated by IRRI, unites public and private seed institutions, farmer collectives, and research bodies.
            </Typography>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 via-emerald-50 to-green-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <blockquote
            className="font-Nunito text-xl text-green-900 font-medium italic leading-relaxed border-l-8 border-green-700 pl-8 md:pl-12 py-8"
            data-aos="zoom-in"
          >
            "By creating a collaborative seed ecosystem, we empower South Asia's farming communities to thrive—building resilience, enhancing yields, and securing food futures."
          </blockquote>
        </div>
      </section>

      {/* Core Purpose - 2 Images Top, Text Bottom */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">

          {/* 2 Team Images - Side by Side */}
          <div className="grid md:grid-cols-2 place-items-center gap-6 mb-16" data-aos="fade-up">
            <div className=" mb-16" >
              <Typography variant="h1">
                Core Purpose
              </Typography>

              <Typography variant="h3" className='mt-5'>
                Despite many improved rice varieties released annually, complex bottlenecks mean few reach farmers at scale. SAN bridges this gap through smart partnerships and data-driven seed delivery.
              </Typography>
            </div>
            <div className="group relative overflow-hidden rounded shadow-xl hover:shadow-2xl transition-all duration-500">
              <img
                src={TeamImg}
                alt="SAN leadership team"
                className="w-full h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <img
                src={TeamImg1}
                alt="Field research team"
                className="w-full h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div> */}
          </div>

          {/* Core Purpose + Objectives */}


          <div data-aos="fade-up" data-aos-delay="300">
            <Typography variant="h1">
              Our Objectives
            </Typography>

            <div className="grid mt-10 md:grid-cols-2 gap-6  mx-auto">
              {objectives.map((objective, idx) => (
                <div
                  key={idx}
                  className="p-8 bg-gradient-to-br from-green-50 via-white to-emerald-50 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-400 border border-green-100 group"
                  data-aos="fade-up"
                  data-aos-delay={idx * 75}
                >
                  <div className="flex items-start  gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-xl font-bold text-white">{idx + 1}</span>
                    </div>
                  </div>
                  <Typography variant="h3" className="font-bold text-green-900 mb-2">
                    {objective}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join Network Section */}
      <section className="py-16 bg-gradient-to-b from-emerald-50 to-green-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div data-aos="fade-up">
            <Typography variant="h1">
              Join the Network
            </Typography>
            <Typography variant="h3" className='mt-5'>
              SAN welcomes voluntary participation from seed corporations, research organizations, farmer producer companies, NGOs, and private sector innovators.
            </Typography>
            <Link
              to="/contact"
              className="inline-flex items-center mt-10 gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-12 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-400 transform hover:-translate-y-2 text-lg"
            >
              contact us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutSAN;

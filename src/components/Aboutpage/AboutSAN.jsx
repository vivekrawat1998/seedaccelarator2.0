import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FieldImg from '/field 2.png';
import TeamImg from '/IMG-20210201-WA0055.jpg';
import TeamImg1 from '/DSC_0048.JPG';
import TeamImg2 from '/DSR 2.jpg';
import TeamImg3 from '/DSR 3.png';
import { Link } from 'react-router-dom';

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
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <section
        className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 py-12"
        data-aos="fade-up"
      >
        <div
          className="md:w-1/2 mb-6 md:mb-0"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <img
            src={FieldImg}
            alt="Rice Field"
            className="rounded-xl shadow-lg w-full max-h-72 object-cover"
          />
        </div>
        <div
          className="md:w-1/2"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <h2 className="text-2xl md:text-3xl font-semibold font-parkinsans mb-4 text-green-700">
            Our Journey
          </h2>
          <p className="font-Nunito mb-4">
            India’s rice sector is transforming rapidly, but slow adoption of new, climate-resilient varieties limits progress for millions of farmers. Outdated seeds persist due to low awareness and poor accessibility, especially among smallholders. Bridging this gap is essential for food security, climate resilience, and rural prosperity.
          </p>
          <p>
            The <span className="font-bold text-green-900">Seed Accelerator Network</span> (SAN), initiated by the Seed Systems and Product Management unit at IRRI, unites public and private seed institutions, farmer collectives, and research bodies. SAN accelerates the movement of improved rice varieties from research to farmer fields, fostering collaborations and sharing knowledge to drive sustainable sector growth.
          </p>
        </div>
      </section>

      <section
        className="py-12 bg-gradient-to-b from-green-50 to-green-100"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="max-w-2xl mx-auto px-4">
          <blockquote className="border-l-4 font-Nunito border-green-700 pl-6 italic text-lg text-green-900 font-medium">
            “By creating a collaborative seed ecosystem, we empower South Asia’s farming communities to thrive—building resilience, enhancing yields, and securing food futures.”
          </blockquote>
        </div>
      </section>
      <section
        className="bg-white py-12 shadow-inner"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-8 items-center">
          <div
            className="md:w-1/2 order-2 md:order-1"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <h2 className="text-2xl md:text-3xl font-semibold font-parkinsans mb-4 text-green-700">
              Core Purpose
            </h2>
            <p className="mb-6">
              Despite many improved rice varieties being released annually, complex bottlenecks mean few reach farmers at scale. SAN exists to unite diverse stakeholders, foster smart partnerships, and use data-driven approaches to strengthen seed delivery, adoption, and positive impacts for farming communities.
            </p>
            <h3 className="text-xl md:text-2xl font-semibold mb-3 font-parkinsans text-green-800">
              Our Objectives
            </h3>
            <ul className="list-disc pl-6 font-Nunito space-y-2 mb-2">
              {objectives.map((item, idx) => (
                <li
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="md:w-1/2 order-1 md:order-2  grid grid-cols-2 gap-4 mb-8 md:mb-0"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <img
              src={TeamImg}
              alt="Team working"
              className="rounded-xl shadow-lg w-full max-h-72 object-cover"
            />
            <img
              src={TeamImg1}
              alt="Team working"
              className="rounded-xl shadow-lg w-full max-h-72 object-cover"
            />
            <img
              src={TeamImg2}
              alt="Team working"
              className="rounded-xl shadow-lg w-full max-h-72 object-cover"
            />
            <img
              src={TeamImg3}
              alt="Team working"
              className="rounded-xl shadow-lg w-full max-h-72 object-cover"
            />
          </div>
        </div>
      </section>
      <section
        className="py-10"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-parkinsans font-semibold mb-3 text-green-700">
            Join the Network
          </h2>
          <p className="mb-6 font-Nunito">
            SAN welcomes voluntary participation from seed corporations, research organizations, farmer producer companies, NGOs, and private sector innovators. Together, let’s accelerate progress and turn advancements in plant breeding into real benefits for communities across South Asia.
          </p>
          <Link to="/contact"
            className="inline-block bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition"
          >
            Contact us
          </Link>
        </div>
      </section>

    </div>
  );
};

export default AboutSAN;

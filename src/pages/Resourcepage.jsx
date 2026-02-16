import React, { useEffect } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import ProfileSection from "../components/Profilesection";
import profileBg from "/Resources.JPG";

const resources = [
  {
    name: "Seed Accelerator 1.0 Report",
    url: "/Seed Accelerator Report 1.0 2024.pdf",
  },
  {
    name: "Seed Accelerator 2.0 Report",
    url: "/Seed Acclerator Report 2.0 2025.pdf",
  },
  {
    name: "Product Diary - India",
    url: "/Product Diary Final India.pdf",
  },
  {
    name: "Product Diary - Bangladesh",
    url: "/Key Product Diary Rice (Bangladesh).pdf",
  },
];

export default function ResourcesPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <ProfileSection
        bgImage={profileBg}
        name="Resources"
        breadcrumbs={["Home", "Resource"]}
      />

      <div className="min-h-screen bg-white py-14 px-6 flex flex-col items-center">
        <h1
          className="text-3xl font-extrabold font-parkinsans text-green-700 mb-2"
          data-aos="fade-down"
        >
          Resources
        </h1>
        <p
          className="text-gray-700 mb-8 font-Nunito text-lg text-center max-w-2xl"
          data-aos="fade-up"
        >
          Explore our collection of reports and guides — preview them instantly or
          download for in-depth insights.
        </p>

        <div className="w-full max-w-5xl grid gap-8">
          {resources.map((res, idx) => (
            <div
              key={idx}
              className="border border-green-700 rounded-2xl overflow-hidden shadow-lg bg-green-50"
              data-aos="fade-up"
              data-aos-delay={idx * 150}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 bg-green-100 border-b border-green-200">
                <div className="flex items-center gap-3">
                  <FaRegFilePdf className="text-green-700 text-2xl" />
                  <h3 className="font-semibold text-lg text-green-900 font-parkinsans">
                    {res.name}
                  </h3>
                </div>
                <a
                  href={res.url}
                  download
                  className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg font-semibold transition duration-150"
                >
                  Download
                </a>
              </div>

              {/* PDF Preview */}
              <div className="bg-white">
                <iframe
                  src={res.url}
                  title={res.name}
                  className="w-full h-[500px] border-0"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

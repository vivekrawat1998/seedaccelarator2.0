import React, { useEffect, useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import ProfileSection from "../components/Profilesection";
import profileBg from "/Resources.JPG";
import Typography from "../ui/Heading";

const resources = [
  {
    category: "SAN Meet Reports",
    name: "Seed Accelerator 1.0 Report",
    url: "/Seed Accelerator Report 1.0 2024.pdf",
  },
  {
    category: "SAN Meet Reports",
    name: "Seed Accelerator 2.0 Report",
    url: "/Seed Acclerator Report 2.0 2025.pdf",
  },
  {
    category: "Product Diaries",
    name: "Product Diary - India",
    url: "/Product Diary Final India.pdf",
  },
  {
    category: "Product Diaries",
    name: "Product Diary - Bangladesh",
    url: "/Key Product Diary Rice (Bangladesh).pdf",
  },
];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Filter resources based on selected category
  const filteredResources = selectedCategory === "all"
    ? resources
    : resources.filter(resource => resource.category === selectedCategory);

  return (
    <>
      <ProfileSection
        bgImage={profileBg}
        name="Resources"
        breadcrumbs={["Home", "Resource"]}
      />

      <div className="min-h-screen container mx-auto bg-white py-14 px-6 ">

        <Typography variant="h1">
          Resources
        </Typography>
        <Typography variant="h3" className="mb-10">
          Explore our collection of reports and guides — preview them instantly or
          download for in-depth insights.
        </Typography>

        {/* Category Filter Buttons */}
        <div className="flex  flex-wrap gap-3 mb-8 w-full max-w-5xl">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-3 font-semibold rounded-xl transition-all duration-300 border shadow-sm font-Nunito ${selectedCategory === "all"
              ? "bg-green-700 text-white scale-105 shadow-md"
              : "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
              }`}
          >
            All Resources
          </button>
          <button
            onClick={() => setSelectedCategory("SAN Meet Reports")}
            className={`px-6 py-3 font-semibold rounded-xl transition-all duration-300 border shadow-sm font-Nunito ${selectedCategory === "SAN Meet Reports"
              ? "bg-green-700 text-white scale-105 shadow-md"
              : "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
              }`}
          >
            📋 SAN Meet Reports
          </button>
          <button
            onClick={() => setSelectedCategory("Product Diaries")}
            className={`px-6 py-3 font-semibold rounded-xl transition-all duration-300 border shadow-sm font-Nunito ${selectedCategory === "Product Diaries"
              ? "bg-green-700 text-white scale-105 shadow-md"
              : "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
              }`}
          >
            📖 Product Diaries
          </button>
        </div>

        <div className="w-full max-w-5xl grid gap-8">
          {filteredResources.map((res, idx) => (
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
                  className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg font-semibold transition duration-150 font-Nunito"
                >
                  Download
                </a>
              </div>

              {/* PDF Preview - ORIGINAL UI PRESERVED */}
              <div className="bg-white">
                <iframe
                  src={res.url}
                  title={res.name}
                  className="w-full h-[500px] border-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

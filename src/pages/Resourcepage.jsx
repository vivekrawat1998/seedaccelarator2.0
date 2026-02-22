import React, { useEffect, useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider"; // Adjust path
import AOS from "aos";
import "aos/dist/aos.css";
import ProfileSection from "../components/Profilesection";
import profileBg from "/Resources.JPG";
import Typography from "../ui/Heading";
import { trackDownload } from "../utils/trackDownload"; // Adjust path

// ✅ REUSABLE TRACKED DOWNLOAD BUTTON
const TrackedDownloadButton = ({ file, className = "" }) => {
  const { user } = useAuth();

  const handleDownload = async () => {
    if (!user) {
      alert("Please login to download");
      return;
    }

    try {
      // Track download FIRST
      await trackDownload({
        userId: user.id,
        fileName: file.name,
        fileTitle: file.title || file.name,
        filePath: file.url,
        fileSize: file.size || 0,
        downloadUrl: `${import.meta.env.VITE_STRAPI_URL}${file.url}`, // Full Strapi URL
        category: file.category || "report",
        ipAddress: "", // Optional: get from navigator
        userAgent: navigator.userAgent
      });

      // THEN trigger download
      const link = document.createElement("a");
      link.href = `${import.meta.env.VITE_STRAPI_URL}${file.url}`;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback direct download
      window.location.href = `${import.meta.env.VITE_STRAPI_URL}${file.url}`;
    }
  };

  return (
    <button
      onClick={handleDownload}
      className={`bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg font-semibold transition duration-150 font-Nunito flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${className}`}
      disabled={!user}
    >
      <FaRegFilePdf className="text-sm" />
      Download
      {!user && <span className="text-xs">(Login required)</span>}
    </button>
  );
};

const resources = [
  {
    id: 1,
    category: "SAN Meet Reports",
    name: "Seed Accelerator 1.0 Report",
    title: "Seed Accelerator 1.0 Report 2024",
    url: "/uploads/Seed_Accelerator_Report_1.0_2024.pdf", // Update to Strapi upload path
    size: 2457600 // ~2.3MB
  },
  {
    id: 2,
    category: "SAN Meet Reports",
    name: "Seed Accelerator 2.0 Report",
    title: "Seed Accelerator 2.0 Report 2025",
    url: "/uploads/Seed_Accelerator_Report_2.0_2025.pdf",
    size: 3124000 // ~3MB
  },
  {
    id: 3,
    category: "Product Diaries",
    name: "Product Diary - India",
    title: "Product Diary India Edition",
    url: "/uploads/Product_Diary_India.pdf",
    size: 1890000 // ~1.8MB
  },
  {
    id: 4,
    category: "Product Diaries",
    name: "Product Diary - Bangladesh",
    title: "Key Product Diary Rice Bangladesh",
    url: "/uploads/Product_Diary_Bangladesh.pdf",
    size: 2234000 // ~2.2MB
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

      <div className="min-h-screen container mx-auto bg-white py-14 px-6">
        <Typography variant="h1">
          Resources
        </Typography>
        <Typography variant="h3" className="mb-10">
          Explore our collection of reports and guides — preview them instantly or
          download for in-depth insights.
        </Typography>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8 w-full max-w-5xl">
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
              key={res.id}
              className="border border-green-700 rounded-2xl overflow-hidden shadow-lg bg-green-50"
              data-aos="fade-up"
              data-aos-delay={idx * 150}
            >
              {/* Header - REPLACED <a> with TrackedDownloadButton */}
              <div className="flex items-center justify-between p-5 bg-green-100 border-b border-green-200">
                <div className="flex items-center gap-3">
                  <FaRegFilePdf className="text-green-700 text-2xl" />
                  <h3 className="font-semibold text-lg text-green-900 font-parkinsans">
                    {res.name}
                  </h3>
                </div>
                {/* ✅ TRACKED DOWNLOAD BUTTON - Replaces old <a> tag */}
                <TrackedDownloadButton file={res} />
              </div>

              {/* PDF Preview - ORIGINAL UI PRESERVED */}
              <div className="bg-white">
                <iframe
                  src={`${import.meta.env.VITE_STRAPI_URL}${res.url}`}
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

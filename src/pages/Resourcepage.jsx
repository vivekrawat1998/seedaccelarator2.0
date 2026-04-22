import React, { useEffect, useMemo, useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import AOS from "aos";
import "aos/dist/aos.css";
import ProfileSection from "../components/Profilesection";
import profileBg from "/banner/Resources_1920X600 px.jpg.jpeg";
import Typography from "../ui/Heading";
import { trackDownload } from "../utils/trackDownload";
import api from "../api/axios";

const STRAPI_ORIGIN = import.meta.env.VITE_STRAPI_URL || "https://sanseed.org";

const getFileUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_ORIGIN}${url}`;
};

const normalizeCategory = (item) => ({
  id: item.id,
  name: item.name || "",
  slug: item.slug || "",
});

const normalizeResource = (item) => {
  const categoryData = item.resource_category || null;
  const thumbnailData = item.thumbnail || null;
  const filesData = Array.isArray(item.files) ? item.files : [];

  return {
    id: item.id,
    name: item.name || "",
    slug: item.slug || "",
    title: item.title || "",
    category: categoryData
      ? {
        id: categoryData.id,
        name: categoryData.name || "",
        slug: categoryData.slug || "",
      }
      : null,
    files: filesData.map((file) => ({
      id: file.id,
      name: file.name || "",
      url: file.url || "",
      size: file.size || 0,
      mime: file.mime || "",
    })),
    thumbnail: thumbnailData
      ? {
        id: thumbnailData.id,
        url: thumbnailData.formats?.medium?.url || thumbnailData.url || "",
      }
      : null,
  };
};

const TrackedDownloadButton = ({ resource, className = "" }) => {
  const { user } = useAuth();
  const file = resource?.files?.[0];

  const handleDownload = async () => {
    if (!user) {
      alert("Please login to download");
      return;
    }

    if (!file?.url) return;

    const fullFileUrl = getFileUrl(file.url);

    try {
      await trackDownload({
        userId: user.id,
        fileName: file.name,
        fileTitle: resource.title || resource.name,
        filePath: file.url,
        fileSize: file.size || 0,
        downloadUrl: fullFileUrl,
        category: resource.category?.name || "resource",
        ipAddress: "",
        userAgent: navigator.userAgent,
      });

      const link = document.createElement("a");
      link.href = fullFileUrl;
      link.download = file.name || resource.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
      window.open(fullFileUrl, "_blank");
    }
  };

  return (
    <button
      onClick={handleDownload}
      className={`bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 font-Karla flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto ${className}`}
      disabled={!user || !file}
    >
      <FaRegFilePdf className="text-lg" />
      {user ? "Download" : "Login Required"}
    </button>
  );
};

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [categoriesRes, resourcesRes] = await Promise.all([
          api.get("/resource-categories"),
          api.get("/resources", {
            params: {
              populate: "*",
            },
          }),
        ]);

        const categoriesData = categoriesRes?.data?.data || [];
        const resourcesData = resourcesRes?.data?.data || [];

        setCategories(categoriesData.map(normalizeCategory));
        setResources(resourcesData.map(normalizeResource));
      } catch (err) {
        console.error("Failed to fetch resources:", err);
        setError("Failed to load resources. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredResources = useMemo(() => {
    if (selectedCategory === "all") return resources;

    return resources.filter(
      (item) => item.category?.slug === selectedCategory
    );
  }, [resources, selectedCategory]);

  return (
    <>
      <ProfileSection
        bgImage={profileBg}
        name="Resources"
        breadcrumbs={["Home", "Resource"]}
      />

      <div className="min-h-screen container mx-auto bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Typography variant="h1" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 ">
            Resources
          </Typography>

          <Typography variant="h3" className="mb-16 text-xl md:text-2xl text-gray-600 font-medium text-start  mx-auto leading-relaxed">
            Explore our comprehensive reports and research products
          </Typography>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-start mb-16  mx-auto">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-8 py-4 font-semibold text-lg rounded-2xl transition-all duration-300 border-2 shadow-lg font-Karla ${selectedCategory === "all"
                ? "bg-green-600 text-white shadow-xl scale-105 border-green-600"
                : "bg-white text-green-700 border-green-200 hover:bg-green-50 hover:border-green-300 hover:shadow-xl"
                }`}
            >
              All Resources ({resources.length})
            </button>

            {categories.map((cat) => {
              const count = resources.filter(r => r.category?.slug === cat.slug).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-8 py-4 font-semibold text-lg rounded-2xl transition-all duration-300 border-2 shadow-lg font-Karla ${selectedCategory === cat.slug
                    ? "bg-green-600 text-white shadow-xl scale-105 border-green-600"
                    : "bg-white text-green-700 border-green-200 hover:bg-green-50 hover:border-green-300 hover:shadow-xl"
                    }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              <div className="col-span-full flex flex-col items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
                <p className="font-Karla text-green-800 text-lg">Loading resources...</p>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-20">
                <p className="font-Karla text-red-600 text-xl mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold font-Karla hover:bg-green-700"
                >
                  Retry
                </button>
              </div>
            ) : filteredResources.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <FaRegFilePdf className="text-6xl text-gray-300 mx-auto mb-6" />
                <p className="font-Karla text-2xl text-gray-500 mb-2">No resources found</p>
                <p className="font-Karla text-gray-400">Try a different category or check back later</p>
              </div>
            ) : (
              filteredResources.map((res, idx) => (
                <div
                  key={res.id}
                  className="group bg-white rounded overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-green-100"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <div className="relative h-56 overflow-hidden bg-green-50">
                    {res.thumbnail?.url ? (
                      <img
                        src={getFileUrl(res.thumbnail.url)}
                        alt={res.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaRegFilePdf className="text-5xl text-green-300" />
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex flex-col gap-4">
                    {res.category?.name && (
                      <span className="inline-block w-fit px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 font-Karla">
                        {res.category.name}
                      </span>
                    )}

                    <h3 className="text-xl font-bold text-gray-900 leading-snug font-Nunito min-h-[56px]">
                      {res.title || res.name}
                    </h3>

                    <div className="flex items-start gap-3 text-sm text-gray-600 font-Karla">
                      <FaRegFilePdf className="text-green-600 mt-1 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium text-gray-700">
                          {res.files[0]?.name || "PDF file"}
                        </p>
                        {res.files[0]?.size ? (
                          <p className="text-xs text-gray-500 mt-1">
                            {(res.files[0].size / 1024).toFixed(2)} KB
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <TrackedDownloadButton
                      resource={res}
                      className="!w-full !justify-center !rounded-xl !py-3 !text-sm"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
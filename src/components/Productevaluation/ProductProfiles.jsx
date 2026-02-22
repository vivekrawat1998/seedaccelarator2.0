import React, { useState, useEffect, useMemo } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Typography from "../../ui/Heading";

const varietyProfiles = [
    { name: "Bina - Dhan 17", pdf: "/Binadhan 17.pdf" },
    { name: "CR Dhan - 102", pdf: "/CR dhan 102.pdf" },
    { name: "CR Dhans - 203", pdf: "/CR dhan 203.pdf" },
    { name: "CR Dhan - 800", pdf: "/CR Dhan 800.pdf" },
    { name: "CR Dhan - 802", pdf: "/CR dhan 802.pdf" },
    { name: "CR Dhan - 902", pdf: "/CR Dhan 902.pdf" },
    { name: "CR Dhan - 50", pdf: "/DRR Dhan 50.pdf" },
    { name: "Kalachampa", pdf: "/Kalachampa.pdf" },
    { name: "MTU 1010", pdf: "/MTU 1010.pdf" },
    { name: "MTU 1075", pdf: "/MTU 1075.pdf" },
    { name: "MTU 1223", pdf: "/MTU 1223.pdf" },
    { name: "Nua Chinikamini", pdf: "/Nua ChiniKamini.pdf" },
    { name: "Nua Dhusra", pdf: "/Nua Dhusra.pdf" },
    { name: "Nua Kalajeera", pdf: "/Nua kalajeera.pdf" },
    { name: "Pooja", pdf: "/Pooja.pdf" },
    { name: "Pratikshya", pdf: "/Pratikshya.pdf" },
    { name: "Sahbhagi Dhan", pdf: "/Sahbhagi Dhan.pdf" },
];

export default function ProductProfiles() {

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        AOS.init({ duration: 700, once: true });
    }, []);

    /* ================= SEARCH FILTER ================= */

    const filteredProfiles = useMemo(() => {
        return varietyProfiles.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    /* ================= PAGINATION ================= */

    const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage);

    const paginatedProfiles = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProfiles.slice(start, start + itemsPerPage);
    }, [filteredProfiles, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    return (
        <section className="">

            <Typography variant="h1" className="mt-10">
                Product Profiles
            </Typography>

            {/* SEARCH */}
            <input
                type="text"
                placeholder="Search variety..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-4 py-2 rounded mt-5 mb-6 w-full sm:w-64 focus:ring-2 focus:ring-green-700 outline-none"
            />

            {/* GRID */}
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">

                {paginatedProfiles.map((profile, idx) => (
                    <div
                        key={profile.name}
                        className="bg-[#dceac2] rounded-md overflow-hidden shadow-sm"
                        data-aos="fade-up"
                        data-aos-delay={idx * 80}
                    >

                        {/* ⭐ PDF PREVIEW */}
                        <div className="h-56 bg-white overflow-hidden border-b">
                            <embed
                                src={`${profile.pdf}#toolbar=0&navpanes=0&scrollbar=0`}
                                type="application/pdf"
                                className="w-full h-full"
                            />
                        </div>

                        {/* CONTENT */}
                        <div className="p-4 flex flex-col gap-3">

                            <h3 className="font-semibold text-gray-800 text-sm">
                                {profile.name}
                            </h3>

                            <a
                                href={profile.pdf}
                                download
                                className="bg-green-700 text-white text-sm px-4 py-2 rounded-md w-fit hover:bg-green-800 transition"
                            >
                                Download
                            </a>

                        </div>

                    </div>
                ))}

            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-10 gap-2 flex-wrap">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded border text-sm
                ${currentPage === i + 1
                                    ? "bg-green-700 text-white border-green-700"
                                    : "bg-white text-gray-700"}
              `}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}

        </section>
    );
}

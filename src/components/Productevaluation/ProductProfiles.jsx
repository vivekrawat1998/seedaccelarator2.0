import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    const displayProfiles = showAll ? varietyProfiles : varietyProfiles.slice(0, 4);

    return (
        <section className="bg-white rounded-xl p-6 container mx-auto my-10">
            <h2 className="md:text-3xl font-parkinsans text-lg font-bold mb-5 text-green-800 flex items-center">
                Product profiles—Variety wise
            </h2>
            <p className="text-gray-700 font-Nunito mb-6">
                Download detailed PDF profiles for each rice variety directly below.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {displayProfiles.map((profile, idx) => (
                    <div
                        key={profile.name}
                        className="bg-green-50 rounded-lg shadow px-4 py-5 flex flex-col justify-between items-start"
                        data-aos="fade-up"
                        data-aos-delay={idx * 130}
                    >
                        <span className="font-semibold text-green-900 mb-2 font-parkinsans text-lg">{profile.name}</span>
                        <a
                            href={profile.pdf}
                            download
                            className="mt-2 inline-block px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700 shadow transition"
                        >
                            Download PDF
                        </a>
                    </div>
                ))}
            </div>
            {!showAll && (
                <div className="flex justify-center mt-6">
                    <button
                        className="px-6 py-2 bg-green-800 text-white font-Nunito cursor-pointer rounded hover:bg-green-700 shadow font-bold transition"
                        onClick={() => setShowAll(true)}
                        data-aos="fade-up"
                        data-aos-delay={displayProfiles.length * 130}
                    >
                        View More
                    </button>
                </div>
            )}
        </section>
    );
}

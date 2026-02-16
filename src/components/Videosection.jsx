// File: VideoSection.jsx
import React, { useState } from "react";

export default function VideoSection() {
    const [showModal, setShowModal] = useState(false);

    // Example YouTube embed link. Change src as needed.
    const videoUrl = "https://www.youtube.com/watch?v=hq3w9FRmazo";

    return (
        <section className="relative min-h-[500px] flex items-center justify-start w-full overflow-hidden">
            <img
                src="/tractor-field-ai-generated.jpg" // Make sure this path matches your public folder or static path
                alt="Agriculture background"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#0d2317]/70"></div>

            {/* Content */}
            <div className="relative z-10 max-w-2xl pl-12 py-20 text-left flex flex-col justify-center">
                <button className="flex items-center px-4 py-1 mb-6 rounded-full bg-[#162e23] text-[#eed972] font-medium shadow-sm hover:bg-[#183025] transition w-fit">
                    <span className="mr-2">🐝</span>
                    Our Latest Blog
                </button>
                <h1 className="text-white font-bold text-3xl md:text-5xl mb-4 leading-tight">
                    Recent Posts from Fresh
                    <br />
                    Agricultural Insights
                </h1>
                <p className="text-white mb-8 max-w-lg">
                    Explore our cutting-edge agricultural innovations through this video showcasing sustainable practices and advanced technologies for a greener future.
                </p>
                <button className="bg-[#149247] hover:bg-[#37b86b] text-white font-semibold px-6 py-3 rounded-lg shadow-lg w-fit flex items-center gap-2">
                    Discover More
                    <span className="inline-block h-2 w-2 bg-yellow-400 rounded-full ml-2"></span>
                </button>
            </div>

            {/* Play Icon - Centered line up with Section */}
            <button
                aria-label="Play Video"
                className="relative z-10 ml-20 flex items-center justify-center w-24 h-24 rounded-full border2 cursor-pointer animate-pulse border-white bg-white/20 backdrop-blur hover:bg-white/40 transition"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "55%",
                    transform: "translate(-50%, -50%)",
                }}
                onClick={() => setShowModal(true)}
            >
                <svg width="46" height="46" fill="none" viewBox="0 0 46 46">
                    <circle cx="23" cy="23" r="22" stroke="#fff" strokeWidth="1" />
                    <polygon points="19,15 33,23 19,31" fill="#fff" />
                </svg>
            </button>

            {/* Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 transition"
                    onClick={() => setShowModal(false)}
                >
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg relative w-full max-w-2xl" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-3 text-2xl text-gray-800 font-bold p-2 bg-white rounded-full hover:bg-gray-100"
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <div className="aspect-w-16 aspect-h-9 w-full">
                            <iframe
                                width="100%"
                                height="400"
                                src={videoUrl}
                                title="Agricultural Insights Video"
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

// File: OurWork.jsx
import React from "react";
import { FaChartLine, FaGlobeAsia, FaSeedling, FaBullhorn, FaBookOpen, FaStore } from "react-icons/fa";

const workData = [
    {
        title: "Research Collaboration",
        desc: "We partner with rice breeding networks and conduct field trials to gather reliable insights for improving agriculture.",
        icon: <FaChartLine className="text-white text-2xl" />,
    },
    {
        title: "Varietal Deployment",
        desc: "We introduce new rice varieties in the right regions, guided by data and market research to ensure best results.",
        icon: <FaGlobeAsia className="text-[#eed972] text-2xl" />,
    },
    {
        title: "Seed System Strengthening",
        desc: "We help farmers by spreading awareness and making high-quality seeds easily accessible.",
        icon: <FaSeedling className="text-white text-2xl" />,
    },
    {
        title: "Market Research",
        desc: "We analyze markets and value chains so our products match real customer needs and expectations.",
        icon: <FaBullhorn className="text-[#eed972] text-2xl" />,
    },
    {
        title: "Knowledge Sharing",
        desc: "We organize trainings and demos to help communities adopt new farming techniques and varieties.",
        icon: <FaBookOpen className="text-white text-2xl" />,
    },
    {
        title: "Seed Business Support",
        desc: "We enable seed companies and farmer groups to deliver reliable seeds at scale.",
        icon: <FaStore className="text-white text-2xl" />,
    },
];

export default function OurWork() {
    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="md:text-4xl text-3xl mb-10 font-Nunito text-black md:text-6xl font-bold  text-center ">
                    Our<span className="px-2 py-1  text-prime rounded-xl font-parkinsans ">work</span>
                    Streams
                </h1>
                <p className="text-center font-Nunito text-gray-600 max-w-xl mx-auto mb-10">
                    We drive agricultural progress through teamwork, innovation, and education. Here’s what we do.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {workData.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white border border-yellow-400 rounded-xl shadow-md hover:shadow-lg transition p-6 max-w-sm md:h-auto h-[30vh] flex flex-col items-center text-center mx-auto"
                        >
                            <span className="inline-flex items-center justify-center rounded-full bg-prime p-3 mb-3 shadow">
                                {item.icon}
                            </span>
                            <h3 className=" text-[12px] md:text-base font-parkinsans font-bold text-[#0d2317] mb-1">{item.title}</h3>
                            <p className="text-gray-700 text-[10px] md:text-sm font-Nunito text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
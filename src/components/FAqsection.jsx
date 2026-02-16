import React, { useState, useRef } from "react";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";

const faqs = [
    {
        question: "Explore answers to common agriculture ?",
        answer: "Explore answers to common agriculture questions, covering farming practices, sustainability, crop management.",
    },
    {
        question: "How do I get started with your services?",
        answer: "You can get started by contacting our team via the website, phone, or visiting our office. We'll guide you through setup and answer any initial questions.",
    },
    {
        question: "How can I access your agricultural technologies?",
        answer: "Access is available online through membership, or via our extension partners and demonstration events. Details are regularly updated on our portal.",
    },
    {
        question: "How do you ensure sustainable farming practices?",
        answer: "We offer trainings, proven crop solutions, and regular support to ensure practices remain sustainable and resilient for the long term.",
    },
];

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState(0);
    const answerRefs = useRef([]);

    return (
        <section className="w-full py-16 bg-white">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-start px-4">
                {/* FAQ List Left */}
                <div className="flex-1 w-full">
                    <button className="flex items-center px-4 py-1 mb-6 rounded-full bg-gray-100 text-[#149247] font-semibold shadow-sm hover:bg-green-100 transition w-fit">
                        <span className="mr-2">🐝</span> Our Faq Us
                    </button>
                    <h2 className="text-3xl md:text-4xl font-parkinsans font-bold text-[#0d2317] mb-8">
                        Frequently Asked
                        <br />
                        Questions Agriculture?
                    </h2>
                    <div className="flex flex-col gap-4">
                        {faqs.map((faq, idx) => {
                            const isOpen = openIndex === idx;
                            return (
                                <div
                                    key={idx}
                                    className={`rounded-2xl shadow-sm border transition-colors duration-300 cursor-pointer ${isOpen
                                        ? "bg-[#0d2317] border-green-700"
                                        : "bg-[#f8fbf6] border-[#EAEAEA]"
                                        }`}
                                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                                >
                                    <div className="flex items-center px-6 py-3">
                                        <span
                                            className={`mr-4 rounded-full bg-green-100 text-green-700 p-2 transition ${isOpen
                                                ? "bg-green-700 text-white"
                                                : "bg-green-100 text-green-700"
                                                }`}
                                        >
                                            <FaArrowRight />
                                        </span>
                                        <span
                                            className={`font-semibold text-lg transition ${isOpen ? "text-white" : "text-[#1a2b19]"
                                                }`}
                                        >
                                            {faq.question}
                                        </span>
                                        <span className="ml-auto">
                                            <FaChevronDown
                                                className={`transition-transform duration-300 ${isOpen
                                                    ? "rotate-180 text-[#F0B100]"
                                                    : "text-gray-500"
                                                    }`}
                                            />
                                        </span>
                                    </div>
                                    <div
                                        ref={el => answerRefs.current[idx] = el}
                                        style={
                                            isOpen
                                                ? {
                                                    maxHeight: answerRefs.current[idx]?.scrollHeight
                                                        ? answerRefs.current[idx].scrollHeight + "200px"
                                                        : "300px",
                                                    opacity: 1,
                                                }
                                                : { maxHeight: "0px", opacity: 0 }
                                        }
                                        className={`overflow-hidden transition-all duration-500 bg-[#f6f8f4] px-6 text-gray-700 text-base ${isOpen ? "py-5 rounded-b-2xl" : "py-0"
                                            }`}
                                    >
                                        {faq.answer}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* Image Right (fixed height, flex-shrink-0) */}
                <div className="flex-1 w-full mt-20 flex items-center justify-center">
                    <div className="overflow-hidden rounded-2xl shadow-lg w-full max-w-md h-[350px] md:h-[400px] flex">
                        <img
                            src="/SAM_1JPG.JPG"
                            alt="Agriculture FAQ"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

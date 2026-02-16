// src/components/BlogSection.jsx
import React, { useEffect } from "react";
import { FaUser, FaCommentDots, FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Aos from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import blogs from "../utils/Blogs";
import { ArrowBigRight, ArrowRight } from "lucide-react";

export default function BlogSection() {
    const navigate = useNavigate();

    useEffect(() => {
        Aos.init({ duration: 1000, once: true });
    }, []);

    return (
        <section className="w-full py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                    <div data-aos="fade-up">
                       
                        <h2 className="text-3xl text-center mb-10 md:text-5xl font-Nunito font-bold text-[#173323] mb-2">
                            Recent Blogs from Seeds
                            System Insights
                        </h2>
                    </div>

                {/* Swiper */}
                <Swiper
                    data-aos="fade-up"
                    modules={[Autoplay]}
                    autoplay={{ delay: 4000 }}
                    spaceBetween={24}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1.7 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {blogs.map((blog) => (
                        <SwiperSlide key={blog.id}>
                            <div className="bg-white rounded-2xl overflow-hidden shadow border border-[#F1F1E8] flex flex-col h-full">
                                <img src={blog.image} alt={blog.title} className="object-cover w-full h-60" />
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex text-gray-500 text-sm gap-6 mb-2">
                                        <div className="flex items-center gap-2">
                                            <FaUser /> {blog.author}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FaCommentDots /> {blog.comments}
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-lg text-[#1b2e1c] mb-4">{blog.title}</h3>
                                    <div className="mt-auto">
                                        <button
                                            onClick={() => navigate(`/blog/${blog.id}`)}
                                            className="bg-[#0d2317] text-white p-3 rounded-full flex items-center justify-center transition hover:bg-[#149247]"
                                        >
                                            <FaArrowRight />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="w-full mt-8 grid place-items-center">
                    <Link to="/blog" className="bg-[#149247] text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-[#37b86b] transition flex items-center font-Karla gap-2">
                        View All Blogs
                        <span className="inline-block items-center rounded-full">
                            <ArrowRight />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}

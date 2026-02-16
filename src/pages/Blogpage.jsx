// src/pages/AllBlogs.jsx
import React, { useEffect } from "react";
import { FaUser, FaCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import profileBg from '/blogs.jpg'
import blogs from "../utils/Blogs";
import ProfileSection from "../components/Profilesection";


export default function AllBlogs() {
    const navigate = useNavigate(); 

    useEffect(() => {
        Aos.init({ duration: 800, once: true });
    }, []);

    return (
        <>
            <ProfileSection
                bgImage={profileBg}
                name="All Blogs"
                breadcrumbs={['Home', 'All Blogs']}
            />
            <section className="w-full py-20 bg-prime/10">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-12" data-aos="fade-up">
                        <h1 className="text-xl md:text-5xl font-parkinsans font-bold text-prime mb-3">
                            Our Blog Posts
                        </h1>
                        <p className="text-gray-600 font-Nunito max-w-2xl mx-auto">
                            Explore our latest insights, innovations, and stories in agriculture and sustainability.
                        </p>
                    </div>
                    {/* Blog Grid */}
                    <div
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        {blogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="bg-white rounded-2xl shadow hover:shadow-lg border border-gray-200 transition overflow-hidden cursor-pointer flex flex-col"
                                onClick={() => navigate(`/blog/${blog.id}`)}
                            >
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="h-60 w-full object-cover"
                                />
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex text-gray-500 text-sm gap-6 mb-3">
                                        <div className="flex items-center gap-2">
                                            <FaUser /> {blog.author}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FaCommentDots /> {blog.comments}
                                        </div>
                                    </div>
                                    <h3 className="font-bold font-parkinsans text-lg text-prime mb-3">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-600 font-Nunito text-sm line-clamp-3 flex-1">
                                        {blog.description}
                                    </p>
                                    <button className="mt-4 font-Nunito text-[#149247] font-medium hover:underline">
                                        Read More →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>

    );
}

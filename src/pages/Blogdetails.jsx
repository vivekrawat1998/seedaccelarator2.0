// src/pages/BlogDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import blogs from "../utils/Blogs";
import { FaUser, FaCommentDots, FaArrowLeft } from "react-icons/fa";
import ProfileSection from "../components/Profilesection";
import profileBg from '/blogsdetails.webp'

export default function BlogDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const blog = blogs.find((b) => b.id === Number(id));
    const otherBlogs = blogs.filter((b) => b.id !== Number(id));

    if (!blog) return <div className="p-10 text-center">Blog not found</div>;

    return (

        <>
            <ProfileSection
                bgImage={profileBg}
                name="Blog Details"
                breadcrumbs={['Home', 'Blog Details']}
            />
            <div className="container mx-auto py-12 px-4">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-[#149247] font-parkinsans font-semibold mb-6 hover:underline"
                >
                    <FaArrowLeft /> Back to Blogs
                </button>

                {/* Blog Content */}
                <img src={blog.image} alt={blog.title} className="w-full h-auto object-cover rounded-2xl mb-6" />
                <div className="flex items-center gap-6 text-gray-600 font-parkinsans text-sm mb-3">
                    <div className="flex items-center gap-2">
                        <FaUser /> {blog.author}
                    </div>
                    <div className="flex items-center gap-1">
                        <FaCommentDots /> {blog.comments}
                    </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold font-parkinsans text-prime mb-6">{blog.title}</h1>
                <div
                    className="text-gray-700 font-Nunito  leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                ></div>

                {/* Other Blogs */}
                <h2 className="text-2xl font-bold mt-12 mb-6 font-prakinsans text-prime/80">Other Blogs</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherBlogs.map((b) => (
                        <div
                            key={b.id}
                            onClick={() => navigate(`/blog/${b.id}`)}
                            className="cursor-pointer border border-gray-200 rounded-2xl overflow-hidden shadow hover:shadow-md transition"
                        >
                            <img src={b.image} alt={b.title} className="w-full h-44 object-cover" />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg font-parkinsans  text-prime mb-2">{b.title}</h3>
                                <p className="text-gray-500 font-Nunito text-sm">{b.description.slice(0, 200)}...</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
}

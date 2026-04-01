import Aos from "aos";
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function ContactSection() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        category: "",
        message: ""
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const validateField = useCallback((name, value) => {

        let error = "";

        switch (name) {

            case "name":
                error = value.trim() ? "" : "Name is required";
                break;

            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                error = emailRegex.test(value) ? "" : "Enter a valid email";
                break;

            case "phone":
                error = /^\d{10,15}$/.test(value)
                    ? ""
                    : "Phone must be 10-15 digits";
                break;

            case "category":
                error = value.trim() ? "" : "Category required";
                break;

            case "message":
                error = value.trim().length >= 10
                    ? ""
                    : "Message must be at least 10 characters";
                break;

            default:
                break;
        }

        setErrors(prev => ({
            ...prev,
            [name]: error
        }));

    }, []);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));

        validateField(name, value);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setStatus("");

        const hasErrors = Object.values(errors).some(e => e);

        if (hasErrors) return;

        setLoading(true);

        try {

            const res = await api.post("/contact-uses", {
                data: {
                    Name: form.name,
                    Email: form.email,
                    phoneNumber: form.phone,
                    category: form.category,
                    Message: form.message,
                    Subject: "Homepage Contact Form"
                }
            });

            setStatus("Message sent successfully!");
            alert("Thank you for reaching out! We'll get back to you soon.");

            setForm({
                name: "",
                email: "",
                phone: "",
                category: "",
                message: ""
            });

        } catch (error) {

            console.log(error);

            setStatus(
                error?.response?.data?.error?.message ||
                "Something went wrong"
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        Aos.init({ duration: 1000, once: true });
    }, []);

    return (
        <section className="w-full  bg-white">

            <div data-aos="fade-up">

                <h2 className="text-3xl text-center mb-10 md:text-5xl font-Nunito tracking-[3px] font-bold text-[#173323] mb-2">
                    Get
                    in
                    <span className="px-2 py-1  text-[#199b6a] rounded-xl font-Nunito tracking-[4px] ">
                        Touch
                    </span>
                    
                </h2>
            </div>

            <div
                data-aos="fade-right"
                className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-10 px-4"
            >

                {/* LEFT SIDE */}
                <div className="flex-1 w-full">


                    <h2 className="text-3xl md:text-4xl font-parkinsans text-[#0d2317] mb-8">
                       Reach out anytime for information on new and improved rice varieties.
                        <br />
                        <br />
                       
                    </h2>

                    <div className="overflow-hidden mt-20 w-full max-w-xl">
                        <img
                            src="/Women with Seedling.png"
                            alt="Contact Us"
                            className="object-cover w-full h-full"
                        />
                    </div>

                </div>

                {/* FORM */}
                <div className="flex-1 w-full">

                    <form
                        data-aos="fade-left"
                        onSubmit={handleSubmit}
                        className="bg-prime/20 rounded-2xl shadow p-8 space-y-6 w-full"
                    >

                        <h4 className="font-Nunito font-bold tracking-[3px] text-xl text-[#0d2317] mb-2">
                            Contact Form
                        </h4>

                     
                        {status && (
                            <div className="text-sm font-semibold bg-green-100 text-green-700">
                                {status}
                            </div>
                        )}

                        <div className="space-y-6 font-Karla">

                            {/* NAME */}
                            <div>
                                <label className="block text-[#0d2317] font-medium text-sm mb-2">
                                    Name*
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    className="w-full rounded-md bg-[#e9eae4] p-3 focus:ring-[#149247] focus:ring-1 outline-none"
                                    placeholder=" Name*"
                                    value={form.name}
                                    onChange={handleChange}
                                />

                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* EMAIL + PHONE */}
                            <div className="md:flex gap-4">

                                <div className="flex-1">

                                    <label className="block text-[#0d2317] font-medium text-sm mb-2">
                                        Email*
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full rounded-md bg-[#e9eae4] p-3 focus:ring-[#149247] focus:ring-1 outline-none"
                                        placeholder=" Email Address*"
                                        value={form.email}
                                        onChange={handleChange}
                                    />

                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.email}
                                        </p>
                                    )}

                                </div>

                                <div className="mt-6 md:mt-0">

                                    <label className="block text-[#0d2317] font-medium text-sm mb-2">
                                        Phone*
                                    </label>

                                    <input
                                        type="number"
                                        name="phone"
                                        className="w-full rounded-md bg-[#e9eae4] p-3 focus:ring-[#149247] focus:ring-1 outline-none"
                                        placeholder=" Phone Number*"
                                        value={form.phone}
                                        onChange={handleChange}
                                    />

                                    {errors.phone && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.phone}
                                        </p>
                                    )}

                                </div>

                            </div>

                            {/* CATEGORY */}
                            <div className="flex-1 mt-6 md:mt-0">

                                <label className="block text-[#0d2317] font-medium text-sm mb-2">
                                    Category*
                                </label>

                                <input
                                    type="text"
                                    name="category"
                                    className="w-full rounded-md bg-[#e9eae4] p-3 focus:ring-[#149247] focus:ring-1 outline-none"
                                    placeholder=" Category*"
                                    value={form.category}
                                    onChange={handleChange}
                                />

                                {errors.category && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.category}
                                    </p>
                                )}

                            </div>

                            {/* MESSAGE */}
                            <div>

                                <label className="block text-[#0d2317] font-medium text-sm mb-2">
                                    Message*
                                </label>

                                <textarea
                                    name="message"
                                    className="w-full rounded-md bg-[#e9eae4] p-3 h-28 min-h-[80px] focus:ring-[#149247] focus:ring-1 outline-none resize-none"
                                    placeholder="Write message"
                                    value={form.message}
                                    onChange={handleChange}
                                />

                                {errors.message && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.message}
                                    </p>
                                )}

                            </div>

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#149247] text-white font-Karla cursor-pointer px-8 py-3 rounded-md shadow hover:bg-[#0d2317] transition-all relative w-fit mt-2 flex items-center gap-1"
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>

                    </form>

                </div>

            </div>

        </section>
    );
}
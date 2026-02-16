import React from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaMapMarkerAlt,
    FaEnvelope,
    FaPhoneAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const FooterSection = () => {
    return (
        <footer className="font-Nunito">
            {/* Main Footer */}
            <div className="bg-prime text-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-14">

                    {/* Brand */}
                    <div className="space-y-5">
                        <img
                            src="/logo seed.jpg"
                            alt="IRRI Logo"
                            className="w-36 h-20 object-contain"
                        />

                        <p className="text-sm font-Karla leading-relaxed text-gray-300">
                            Advancing sustainable agriculture through science, innovation,
                            and partnerships to ensure food security worldwide.
                        </p>

                        <div className="flex gap-3">
                            {[FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, idx) => (
                                <Link
                                    key={idx}
                                    to="#"
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-yellow-400 hover:text-black transition"
                                >
                                    <Icon size={14} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-white relative inline-block">
                            Address
                            <span className="absolute left-0 -bottom-2 w-10 h-[2px] bg-yellow-400"></span>
                        </h4>

                        <div className="space-y-4 text-sm font-Karla">
                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-yellow-400 mt-1" />
                                <div>
                                    <p className="font-semibold text-white">Headquarters</p>
                                    <p className="text-gray-300">
                                        Pili Drive, Los Baños, Laguna 4031, Philippines
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-yellow-400 mt-1" />
                                <div>
                                    <p className="font-semibold text-white">Mailing Address</p>
                                    <p className="text-gray-300">
                                        1st Floor, CG Block, NASC Complex,
                                        Dev Prakash Shastri Marg, Pusa,
                                        New Delhi – 110012
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <FaEnvelope className="text-yellow-400 mt-1" />
                                <div>
                                    <p className="font-semibold text-white">Email</p>
                                    <p className="text-gray-300">info@irri.org</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-white relative inline-block">
                            Contact
                            <span className="absolute left-0 -bottom-2 w-10 h-[2px] bg-yellow-400"></span>
                        </h4>

                        <ul className="space-y-2 text-sm font-Karla text-gray-300">
                            <li>+63 2 8580 5600</li>
                            <li>+63 2 8845 0563</li>
                            <li>+63 2 8580 5699</li>
                            <li>+63 2 8845 0606</li>
                            <li>+011 6676 3000</li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-white relative inline-block">
                            Quick Links
                            <span className="absolute left-0 -bottom-2 w-10 h-[2px] bg-yellow-400"></span>
                        </h4>

                        <ul className="space-y-3 text-sm font-Karla">
                            <li>
                                <Link
                                    to="https://www.irri.org/who-we-are"
                                    className="hover:text-yellow-400 transition"
                                >
                                    About IRRI
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="https://www.cgiar.org/"
                                    className="hover:text-yellow-400 transition"
                                >
                                    About CGIAR
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10">
                    <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-gray-400 flex flex-col md:flex-row items-center justify-between">
                        <span>© 2025 International Rice Research Institute</span>
                        <span className="mt-2 md:mt-0 text-gray-500">
                            Building a food-secure future
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;

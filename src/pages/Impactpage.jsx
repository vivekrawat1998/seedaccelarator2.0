import React, { useState } from "react";

import profileBg from "/banner/Impact _1920X1080 px.jpg";

import ProfileSection from "../components/Profilesection";
import SeedScalingImpact from "../components/impact stoies/SeedScalingImpact";
import VarietiesScalingSnapshot from "../components/impact stoies/Snapshot";
import VarietalTurnoverImpact from "../components/impact stoies/TurnOver";
import EconomicValueSection from "../components/impact stoies/Empactvalue";
import ImpactMap from "../components/impact stoies/Impactmap";

import { Link } from "react-router-dom";

const Impactpage = () => {
    const [filters, setFilters] = useState({
        year: "",
        activity: "",
        state: ""
    });

    const states = [
        "Uttar Pradesh",
        "Bihar",
        "Chhattisgarh",
        "Jharkhand",
        "Odisha",
        "West Bengal",
        "Telangana"
    ];

    return (
        <div className="overflow-hidden">
            <ProfileSection
                bgImage={profileBg}
                name="Impact stories"
                breadcrumbs={["Home", "Impact Stories"]}
            />
            <section className="bg-white py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
                        Impact Across States
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4 mb-10">
                        <select
                            className="px-4 py-2 border rounded-lg shadow-sm"
                            onChange={(e) =>
                                setFilters({ ...filters, year: e.target.value })
                            }
                        >
                            <option value="">All Years</option>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                        </select>

                        <select
                            className="px-4 py-2 border rounded-lg shadow-sm"
                            onChange={(e) =>
                                setFilters({ ...filters, activity: e.target.value })
                            }
                        >
                            <option value="">Activity Type</option>
                            <option>Seed Scaling</option>
                            <option>Demonstration</option>
                        </select>

                        <select
                            className="px-4 py-2 border rounded-lg shadow-sm"
                            onChange={(e) =>
                                setFilters({ ...filters, state: e.target.value })
                            }
                        >
                            <option value="">All States</option>

                            {states.map((state) => (
                                <option key={state}>{state}</option>
                            ))}
                        </select>
                    </div>
                    <ImpactMap filters={filters} />
                </div>
            </section>
            <SeedScalingImpact />
            <VarietiesScalingSnapshot />
            <VarietalTurnoverImpact />
            <EconomicValueSection />
            <div className="text-center mt-24 mb-10 max-w-xl mx-auto">
                <h3 className="text-3xl font-extrabold text-green-900 mb-6">
                    Become a Member
                </h3>
                <Link
                    to="/network-members#register"
                    className="inline-block bg-green-700 hover:bg-green-800 text-white font-bold text-lg px-12 py-4 rounded-full shadow-xl transition transform hover:scale-105"
                >
                    Register Now
                </Link>
            </div>
        </div>
    );
};

export default Impactpage;
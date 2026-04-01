import React, { useState } from "react";

import profileBg from "/banner/Impact_1920X600 px.jpg.jpeg";

import ProfileSection from "../components/Profilesection";
import SeedScalingImpact from "../components/impact stoies/SeedScalingImpact";
import VarietiesScalingSnapshot from "../components/impact stoies/Snapshot";
import VarietalTurnoverImpact from "../components/impact stoies/TurnOver";
import EconomicValueSection from "../components/impact stoies/Empactvalue";
import ImpactMap from "../components/impact stoies/Impactmap";

import { Link } from "react-router-dom";
import ImpactSeedAcceleratorsTable from "../components/impact stoies/Impactseedaccelarator";

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


                    <ImpactMap filters={filters} />
                </div>
            </section>
            <SeedScalingImpact />
            <VarietiesScalingSnapshot />
            <VarietalTurnoverImpact />
            <EconomicValueSection />

            <ImpactSeedAcceleratorsTable />

        </div>
    );
};

export default Impactpage;
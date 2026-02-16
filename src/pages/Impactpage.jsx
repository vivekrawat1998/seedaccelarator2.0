import React from 'react'
import profileBg from '/hero/impact.JPG'
import SeedScalingImpact from '../components/impact stoies/SeedScalingImpact'
import ProfileSection from '../components/Profilesection'
import VarietiesScalingSnapshot from '../components/impact stoies/Snapshot'
import VarietalTurnoverImpact from '../components/impact stoies/TurnOver'
import EconomicValueSection from '../components/impact stoies/Empactvalue'
import { Link } from 'react-router-dom'

const Impactpage = () => {
    return (
        <div className=''>
            <ProfileSection
                bgImage={profileBg}
                name="Impact stories"
                breadcrumbs={['Home', 'Impact Stories']}
            />
            <SeedScalingImpact />
            <VarietiesScalingSnapshot />
            <VarietalTurnoverImpact />
            <EconomicValueSection />
            <div className="text-center mt-24 mb-10 max-w-xl mx-auto" data-aos="zoom-in" data-aos-offset="50">
                <h3 className="text-3xl font-parkinsans font-extrabold text-green-900 mb-6 drop-shadow-sm">
                    Become a Member
                </h3>
                <Link to="/network-members#register"
                    className="inline-block bg-green-700 font-Nunito hover:bg-green-800 text-white font-bold text-lg px-12 py-4 rounded-full shadow-xl transition transform hover:scale-105"
                >
                    Register Now
                </Link>
            </div>
        </div >
    )
}

export default Impactpage
import React from 'react'
import ProfileSection from '../components/Profilesection'
import NetworkMembersPage from './NetworkMembers'
import profileBg from '/banner/SAN Members_1920X600 px.jpg.jpeg'

const Networkpage = () => {
    return (
        <div>
            <ProfileSection
                bgImage={profileBg}
                name="Network Members"
                breadcrumbs={['Home', 'Network Members']}
            />
            <NetworkMembersPage />
        </div>
    )
}

export default Networkpage
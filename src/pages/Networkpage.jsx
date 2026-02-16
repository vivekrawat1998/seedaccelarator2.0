import React from 'react'
import ProfileSection from '../components/Profilesection'
import NetworkMembersPage from './NetworkMembers'
import profileBg from '/Member Network page .JPG'

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
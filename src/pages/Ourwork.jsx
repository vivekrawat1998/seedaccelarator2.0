import React from 'react'
import ProfileSection from '../components/Profilesection'
import OurWorkTimeline from '../components/Ourworkpage/Ourworkpage'
import profileBg from '/SAM_1JPG.JPG'

const Ourwork = () => {
    return (
        <div className=' mx-auto'>
            <ProfileSection
                bgImage={profileBg}
                name="Our Work"
                breadcrumbs={['Home', 'Our Work']}
            />
            <OurWorkTimeline />
        </div>
    )
}

export default Ourwork
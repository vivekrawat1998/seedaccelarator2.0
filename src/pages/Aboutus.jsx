import React from 'react'
import ProfileSection from '../components/Profilesection'
import profileBg from '/SAM_3.JPG'
import AboutSAN from '../components/Aboutpage/AboutSAN'

const Aboutus = () => {
    return (
        <div className='aboutus'>
            <ProfileSection
                bgImage={profileBg}
                name="About SAN"
                breadcrumbs={['Home', 'About']}
            />
            <AboutSAN />
        </div>
    )
}

export default Aboutus
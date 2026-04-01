import React from 'react'
import ProfileSection from '../components/Profilesection'
import profileBg from '/banner/About Us_1920X600 px.jpg.jpeg'
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
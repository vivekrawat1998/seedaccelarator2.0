import React from 'react'
import HeroSection from '../components/Herosection'
import ServicesSection from '../components/Servicessection'
import AboutUsSection from '../components/AboutusSection'
import TestimonialCarousel from '../components/Testimonials'
import BlogSection from '../components/BlogSection'
import CountupSection from '../components/CountupSection'
import WhyChooseUs from '../components/Whychooseus'
import OurWork from '../components/Ourwork'

import ContactSection from '../components/ContactSection'
import RiceSections from '../components/Swipersection'
import BeforeAfterSection from '../components/BeforeAndAftersection'
import Ourpartners from '../ui/Ourpartners'

const Homepage = () => {
    return (
        <div className='overflow-hidden'>
            <HeroSection />
            <AboutUsSection />
            {/* <OurWork /> */}
            {/* <WhyChooseUs /> */}
            <CountupSection />
            <Ourpartners />
            <BlogSection />
            <ContactSection />
            {/* <ServicesSection />
            <TestimonialCarousel /> */}
        </div>
    )
}

export default Homepage
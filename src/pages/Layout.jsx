import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FooterSection from '../components/Footer';


const Layout = () => {


    return (
        <>
            <Navbar />
            <Outlet />
            <FooterSection />
        </>
    )
}

export default Layout
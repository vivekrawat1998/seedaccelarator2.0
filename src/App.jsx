import { useState } from 'react'
import './App.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import Homepage from './pages/Homepage'
import Aboutus from './pages/Aboutus'
import Ourwork from './pages/Ourwork'
import Networkpage from './pages/Networkpage'
import Productpage from './pages/Productpage'
import Impactpage from './pages/Impactpage'
import ResourcesPage from './pages/Resourcepage'
import ContactPage from './pages/Contactpage'
import BlogDetails from './pages/Blogdetails'
import AllBlogs from './pages/Blogpage'
import ScrollToTop from './utils/Scrolltotop'

function App() {
  return (
    <>
      <div>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path='/about' element={<Aboutus />} />
            <Route path='/ourwork' element={<Ourwork />} />
            <Route path='/network-members' element={<Networkpage />} />
            <Route path='*' element={<h1>404 Not Found</h1>} />
            <Route path='/product' element={<Productpage />} />
            <Route path='/impact' element={<Impactpage />} />
            <Route path='/resource' element={<ResourcesPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/blog" element={<AllBlogs />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App

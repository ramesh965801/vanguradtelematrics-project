import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Products from '../components/Products'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import About from '../components/About'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Navbar/>

        <Banner/>

        <Products/>
        <Testimonials/>
        <Contact/>
        <About/>
        <Footer/>
      
    </div>
  )
}

export default Home

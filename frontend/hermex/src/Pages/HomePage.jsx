import React from 'react'
import Hero from '../Components/Hero'
import Navbar from '../Components/Shared/Navbar'
import Footer from '../Components/Shared/Footer'
import Feed from '../Components/Feed'

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Feed />
      <Footer />
    </>
  )
}

export default HomePage

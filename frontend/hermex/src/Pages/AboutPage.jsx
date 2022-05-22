import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Components/Shared/Footer'
import Navbar from '../Components/Shared/Navbar'

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full h-screen p-4">
        <div
          className="grid h-1/2 card bg-base-300 rounded-box place-items-center"
          id="aboutImg"
        ></div>
        <div className="divider"></div>
        <div className="flex flex-col justify-center items-center text-2xl p-4">
          <h3 className="text-center">About Us</h3>
          <p className="p-4 text-justify">
            Hermex is just a hobby project that was only created to satisfy the curiosity of space
            from all around the pale blue dot.
          </p>
          <Link to="/" className="btn btn-accent w-full md:w-32">
            Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutPage

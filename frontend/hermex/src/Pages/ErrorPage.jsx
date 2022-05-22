import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Components/Shared/Footer'

const ErrorPage = () => {
  return (
    <>
      <div
        id="errorDiv"
        className="w-full h-screen grid grid-cols-3 grid-rows-3 items-center justify-between place-content-center"
      >
        <div className="row-span-3 col-span-3 w-full h-full flex flex-col justify-center items-center">
          <h1 className="animate-pulse text-white text-center text-4xl mb-9">404 Not Found</h1>
          <Link to="/" className="btn btn-primary w-32 hover:bg-transparent hover:outline">
            Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ErrorPage

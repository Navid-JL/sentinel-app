import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Shared/Navbar'
import Footer from '../Components/Shared/Footer'

const RegisterPage = (type) => {
  return (
    <>
      <Navbar />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input type="text" placeholder="username" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="text" placeholder="password" className="input input-bordered" />
                <div class="form-control mt-2">
                  <label class="label cursor-pointer">
                    <span class="label-text">Show Password</span>
                    <input type="checkbox" checked="checked" class="checkbox checkbox-accent" />
                  </label>
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-accent">Login</button>
              </div>
              <Link to="/" className="text-center mt-4 btn btn-outline">
                Already have an account?
              </Link>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default RegisterPage

import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Divider.css'

const Divider = () => {
  return (
    <div class="flex flex-col w-full lg:flex-row min-h-full p-4 ">
      <div
        id="gallery"
        class="grid flex-grow h-96 card bg-base-300 rounded-box place-items-center font-semibold text-6xl text-slate-100 transition-all	"
      >
        <Link to="/" className="h-full w-full flex justify-center items-center">
          Gallery
        </Link>
      </div>
      <div class="divider lg:divider-horizontal"></div>
      <div
        id="news"
        class="grid flex-grow h-96 card bg-base-300 rounded-box place-items-center font-semibold text-6xl text-slate-100 transition-all	"
      >
        <Link to="/" className="h-full w-full flex justify-center items-center">
          News
        </Link>
      </div>
    </div>
  )
}

export default Divider

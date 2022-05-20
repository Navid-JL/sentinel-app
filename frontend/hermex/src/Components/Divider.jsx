import React from 'react'
import { Link } from 'react-router-dom'

const Divider = () => {
  return (
    <div className="flex flex-col w-full lg:flex-row min-h-full p-8">
      <div
        id="gallery"
        className="grid flex-grow h-96 card bg-base-300 rounded-box place-items-center font-semibold text-6xl text-slate-100 transition-all	"
      >
        <Link to="/gallery" className="h-full w-full flex justify-center items-center">
          Gallery
        </Link>
      </div>
      <div className="divider lg:divider-horizontal"></div>
      <div
        id="news"
        className="grid flex-grow h-96 card bg-base-300 rounded-box place-items-center font-semibold text-6xl text-slate-100 transition-all	"
      >
        <a
          className="h-full w-full flex justify-center items-center"
          href="https://www.reddit.com/r/space"
          target="_blank"
          rel="noreferrer"
        >
          News
        </a>
      </div>
    </div>
  )
}

/*
        <Link
          to={{ pathname: 'www.reddit.com/r/space' }}
          target="_blank"
          className="h-full w-full flex justify-center items-center"
        >
          News
        </Link>
*/

export default Divider

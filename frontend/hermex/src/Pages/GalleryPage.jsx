import React from 'react'
import ImagePost from '../Components/Shared/ImagePost'
import Navbar from '../Components/Shared/Navbar'

const GalleryPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 p-4 auto-rows-[minmax(0,1fr)]">
          <ImagePost />
          <ImagePost />
          <ImagePost />
          <ImagePost />
          <ImagePost />
        </div>
      </div>
    </>
  )
}

export default GalleryPage

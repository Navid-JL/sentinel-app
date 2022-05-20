import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GalleryPage from './Pages/GalleryPage'
import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

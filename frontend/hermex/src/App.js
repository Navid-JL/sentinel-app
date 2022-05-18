import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GalleryPage from './Pages/GalleryPage'
import HomePage from './Pages/HomePage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

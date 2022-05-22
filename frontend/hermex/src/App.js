import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GalleryPage from './Pages/GalleryPage'
import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import RegisterPage from './Pages/RegisterPage'
import ErrorPage from './Pages/ErrorPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<RegisterPage type="login" />} />
          <Route path="/register" element={<RegisterPage type="register" />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

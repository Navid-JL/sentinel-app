import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import WelcomePage from './Pages/WelcomePage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

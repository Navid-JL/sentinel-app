import Divider from '../Components/Divider'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import '../Styles/Home.css'
import { Link } from 'react-router-dom'
import NewsArticle from '../Components/NewsArticle'
import ImagePost from '../Components/ImagePost'

const Home = () => {
  return (
    <>
      <Navbar />
      <Divider />
      <div class="divider lg:divider-horizontal"></div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 auto-rows-[minmax(0,1fr)]">
          <ImagePost />
          <NewsArticle />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home

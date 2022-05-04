import Divider from '../Components/Divider'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import feedImg from '../Assets/Images/feedimg.jpg'

const Home = () => {
  return (
    <>
      <Navbar />
      <Divider />
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="col-span-3 p-4">
            <img src={feedImg} alt="Feed" className="rounded" />
          </div>
          <div className="p-4">
            <h2 className="font-medium leading-tight text-4xl">Lorem, ipsum.</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque minima nostrum
              blanditiis provident maxime cumque. Odio aspernatur itaque quam eius dolore natus
              facilis, rerum laborum nesciunt, maxime enim voluptas ipsam quaerat eos facere
              consequuntur nisi ea debitis perferendis rem possimus.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home

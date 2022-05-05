import { Link } from 'react-router-dom'
import feedImg from '../Assets/Images/feedimg.jpg'

const ImagePost = () => {
  return (
    <div
      id="imagePost"
      className="md:col-span-2 p-4 flex flex-col justify-center text-center transition-all	"
    >
      <Link to="/">
        <h2 className="md:text-3xl">Lorem ipsum dolor sit amet.</h2>
        <img src={feedImg} alt="Feed" className="w-full rounded-3xl" />
      </Link>
    </div>
  )
}

export default ImagePost

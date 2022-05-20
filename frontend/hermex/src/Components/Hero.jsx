import heroImage from '../Assets/Images/hero.jpg'
import { Link } from 'react-scroll'

const Hero = () => {
  return (
    <section className="hero min-h-screen" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-overlay bg-opacity-60 drawer-content"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-4xl font-mono text-white">EXPLORE THE UNIVERSE</h1>
          <p className="mb-5">
            “Somewhere, something incredible is waiting to be known.” Carl Sagan
          </p>
          <Link to="feed" smooth={true} className="btn btn-outline btn-primary" spy={true}>
            Explore
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero

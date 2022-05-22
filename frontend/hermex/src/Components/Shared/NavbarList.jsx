import { Link } from 'react-router-dom'
import { FaMailBulk, FaHeart, FaCamera, FaHome, FaSpaceShuttle } from 'react-icons/fa'

const NavbarList = () => {
  return (
    <ul
      tabIndex="0"
      className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
    >
      <li className="mb-1">
        <Link to="/">
          <FaHome /> Homepage
        </Link>
      </li>
      <li className="mb-1">
        <Link to="/gallery">
          <FaCamera /> Gallery
        </Link>
      </li>
      <li className="mb-1">
        <Link to="/favs">
          <FaHeart /> Favourites
        </Link>
      </li>
      <li className="mb-1">
        <Link to="/about">
          <FaSpaceShuttle /> About
        </Link>
      </li>
      <li className="mb-1">
        <Link className="btn btn-success text-black mt-1" to="/register">
          Register
        </Link>
      </li>
    </ul>
  )
}

export default NavbarList

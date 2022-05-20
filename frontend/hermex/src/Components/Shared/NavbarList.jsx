import { Link } from 'react-router-dom'
import { FaMailBulk, FaHeart, FaCamera, FaHome, FaSpaceShuttle } from 'react-icons/fa'

const NavbarList = () => {
  return (
    <ul
      tabIndex="0"
      className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
    >
      <li>
        <Link to="/">
          <FaHome /> Homepage
        </Link>
      </li>
      <li>
        <Link to="/gallery">
          <FaCamera /> Gallery
        </Link>
      </li>
      <li>
        <Link to="/favs">
          <FaHeart /> Favourites
        </Link>
      </li>
      <li>
        <Link to="/about">
          <FaSpaceShuttle /> About
        </Link>
      </li>
      <li>
        <Link className="btn btn-success text-black mt-1" to="/register">
          Register
        </Link>
      </li>
    </ul>
  )
}

export default NavbarList

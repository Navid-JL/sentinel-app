import { FaMailBulk, FaHeart, FaCamera, FaHome, FaSpaceShuttle } from 'react-icons/fa'

const NavbarList = () => {
  return (
    <ul
      tabIndex="0"
      className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
    >
      <li>
        <a href="/home">
          <FaHome /> Homepage
        </a>
      </li>
      <li>
        <a href="/gallery">
          <FaCamera /> Gallery
        </a>
      </li>
      <li>
        <a href="/favs">
          <FaHeart /> Favourites
        </a>
      </li>
      <li>
        <a href="/about">
          <FaSpaceShuttle /> About
        </a>
      </li>
      <li>
        <a href="/contact">
          <FaMailBulk /> Contact
        </a>
      </li>
      <li>
        <button class="btn btn-success text-black mt-1">Register</button>
      </li>
    </ul>
  )
}

export default NavbarList

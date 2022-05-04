import React from 'react'

const NavbarList = () => {
  return (
    <ul
      tabIndex="0"
      className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
    >
      <li>
        <a href="/home">Homepage</a>
      </li>
      <li>
        <a href="/gallery">Gallery</a>
      </li>
      <li>
        <a href="/favs">Favourites</a>
      </li>
      <li>
        <button class="btn btn-success text-black mt-1">Register</button>
      </li>
    </ul>
  )
}

export default NavbarList

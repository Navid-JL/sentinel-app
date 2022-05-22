import { Link } from 'react-router-dom'
import logo from '../../Assets/Icons/icons8_planet_64.png'
import Button from './Button'
import NavbarDropdown from './NavbarDropdown'
import NavbarList from './NavbarList'
import NavbarPosition from './NavbarPosition'
import NavbarSVG from './NavbarSVG'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 sticky top-0 z-50 px-5">
      <NavbarPosition type="navbar-start">
        <NavbarDropdown>
          <NavbarSVG />
          <NavbarList />
        </NavbarDropdown>
      </NavbarPosition>
      <NavbarPosition type="navbar-center">
        <Link
          className="btn btn-ghost normal-case text-xl flex flex-col items-center justify-center"
          to="/"
        >
          <img width="50px" height="50px" src={logo} alt="Hermex" />
        </Link>
      </NavbarPosition>
      <NavbarPosition type="navbar-end">
        <Button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </Button>
      </NavbarPosition>
    </div>
  )
}

export default Navbar

import React from 'react'

const NavbarPosition = ({ children, type }) => {
  return type === 'navbar-start' ? (
    <div className="navbar-start">{children}</div>
  ) : type === 'navbar-center' ? (
    <div className="navbar-center">{children}</div>
  ) : type === 'navbar-end' ? (
    <div className="navbar-end">{children}</div>
  ) : (
    <div>{children}</div>
  )
}

export default NavbarPosition

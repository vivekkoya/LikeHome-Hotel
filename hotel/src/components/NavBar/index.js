import React from 'react'


const NavBar = () => {
  return (
    <nav className="nav">
        <a href="/" className="site-name">LikeHome</a>
        <ul className="row">
            <li>
                <a className="middle-link" href="/"> Find Hotel</a>
            </li>
            <li>
                <a className="middle-link" href="/viewreservations"> View Reservations </a>
            </li>
            <li>
                <a className="middle-link" href="/hotelviewbookings"> View Bookings </a>
            </li>
        </ul>
        <ul className="row">
            <li>
                <a className="button-link" href="/login">Sign In</a>
            </li>
            <li>
                <a className="button-link" href="/signup">Sign Up</a>
            </li>
        </ul>
    </nav>
  )
}

export default NavBar
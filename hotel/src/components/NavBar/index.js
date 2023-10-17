import React from 'react'
import { useCookies } from "react-cookie"



const NavBar = () => {
    const [cookies, setCookies] = useCookies(['users'])
    var user = cookies.user
    if (!user) {
        user = ""
    }

    const logout = () => {
        setCookies("user", "", {path:"/"})
        window.location.href = "/login"
    }

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
                { user === "" && <a className="button-link" href="/login">Sign In</a>}
            </li>
            <li>
                { user !== "" && <button className="user-name" onClick={logout}>{user}</button>}
            </li>
        </ul>
    </nav>
  )
}

export default NavBar
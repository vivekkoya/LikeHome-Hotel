import React from 'react'
import { useCookies } from "react-cookie"



const NavBar = () => {
    const [cookies, setCookies] = useCookies(['users', 'isAdmin'])
    var user = cookies.user
    if (!user) {
        user = ""
    }
    var type = cookies.isAdmin
    if (!type) {
        type = ""
    }

    const logout = () => {
        setCookies("user", "", {path:"/"})
        setCookies("isAdmin", "", {path:"/"})
        window.location.href = "/login"
    }

  return (
    <nav className="site-nav">
        <a href="/" className="site-name">LikeHome</a>
        <ul className="row">
            <li>
                <a className="middle-link" href="/search"> Find Hotel</a>
            </li>
            <li>
                { type === "client" && <a className="middle-link" href="/viewreservations"> View Reservations </a> }
            </li>
            <li>
                { type === "hotel" && <a className="middle-link" href="/hotelviewbookings"> View Bookings </a> }
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
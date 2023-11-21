import React from 'react'
import { useCookies } from "react-cookie"
import { FaUser } from "react-icons/fa"



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
      /*
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
                
                { user === "" && 
                    <a className="button-link" href="/login">Sign In</a> }
            </li>
            <li>
                { user !== "" && <div className="User-row">
                    <FaUser/>
                    <button className="user-name" onClick={logout}>{user}</button>
                    </div> }
            </li>
        </ul>
    </nav>
    **/

    <header class="header" id="header">
         <nav class = "nav container " >
            <div>
               <a href="#" class="nav__logo">
                  <img src="assets/img/Suite_Spot_Logo-01.png" alt="explore image" class="logo__perfil" />
                  SuiteSpot
               </a>
            </div>
            
            <div class="nav__menu" id="nav-menu">
               <ul class="nav__list">
                  <li class="nav__item">
                     <a href="/" class="nav__link">Home</a>
                  </li>
                  <li class="nav__item">
                     <a href="/search" class="nav__link">Search</a>
                  </li>
                  <li class="nav__item">
                     <a href="/viewreservations" class="nav__link">View Reservations</a>
                  </li>
                  <li>
                
                { user === "" && 
                    <a className="button-link" href="/login">Sign In</a> }
            </li>
            <li>
                { user !== "" && <div className="User-row">
                    <FaUser/>
                    <button className="user-name" onClick={logout}>{user}</button>
                    </div> }
            </li>

               </ul>

            </div>
         
         </nav>
      </header>
  )
}

export default NavBar
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
         <nav class = "nav container ">
            <div class="nav__logo-img">
               <a href="#" class="nav__logo">
                  <img src="assets/img/Suite_Spot_Logo-01.png" alt="explore image" class="logo__perfil" />
                  SuiteSpot
               </a>
            </div>
            
            <div class="nav__menu" id="nav-menu">
               <ul class="nav__list">
                  <li class="nav__item">
                     <a href="#home" class="nav__link">Home</a>
                  </li>
                  <li class="nav__item">
                     <a href="#about" class="nav__link">About</a>
                  </li>
                  <li class="nav__item">
                     <a href="#popular" class="nav__link">Popular</a>
                  </li>
                  <li class="nav__item">
                     <a href="#explore" class="nav__link">Testimonials</a>
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

              {/*  <!-- Close button--> */}
               <div class="nav__close" id="nav-close">
                  <i class="ri-close-line"> </i>
               </div>
            </div>

           {/*  <!-- toggle button--> */}
            <div class="nav__toggle" id="nav-toggle">
               <i class="ri-menu-fill"></i>
            </div>
         
         </nav>
      </header>
  )
}

export default NavBar
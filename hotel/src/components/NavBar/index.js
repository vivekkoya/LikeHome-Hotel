import React from 'react'
import { useCookies } from "react-cookie"
import { FaUser } from "react-icons/fa"
import "./NavBar.css"



const NavBar = () => {
    const [cookies, setCookies] = useCookies(['users', 'isAdmin'])
    var user = cookies.user
    var points = cookies.points 

    

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

    var membership = <p style={{ color: "white" }}> Basic: {points} pts </p>;

    if (points > 40000) {
        membership = <p style={{ color: "#C5D0CE" }}> Platinum: {points} pts </p>;
    } else if (points > 30000) {
        membership = <p style={{ color: "#FFD971" }}> Gold: {points} pts </p>;
    } else if (points > 20000) {
        membership = <p style={{ color: "#CAD3D7" }}> Silver: {points} pts </p>;
    } else if (points > 10000) {
        membership = <p style={{ color: "#C2783F" }}> Bronze: {points} pts </p>;
    }    


  return (

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
                  {user !== "" &&
                  <li class="nav__item">
                     <a href="/viewreservations" class="nav__link">MyBookings</a>
                  </li> }
                  <li>
                
                { user === "" && 
                    <a className="button-link" href="/login">Sign In</a> }
            </li>
            <li>
                { user !== "" && <div className="row user-points">
                    {/* look to line 28 - 38 to see how membership is defined*/}
                    {points !== null && membership } 
                    <div className="User-row">

                    <FaUser/>
                    <button className="user-name" onClick={logout}>{user}</button>
                    </div>
                    </div> }
            </li>

               </ul>

            </div>
         
         </nav>
      </header>
  )
}

export default NavBar
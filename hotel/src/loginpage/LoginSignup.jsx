import React from 'react'
import './LoginSignup.css'


const LoginSignup = () => {

    const [action, setAction] = React.useState("Sign Up");
    
  return (
    <div className = 'container'>
        <div className = 'header'>
            <div className = 'text'>
                {action}
            </div>
            <div className = 'underline'>
            </div>
        </div>
        <div className = 'inputs'>
            <div className = 'input'>
                <img src='' alt = ''/>
                <input type = "text" placeholder = "Name" />
            </div>
            <div className = 'input'>
                <img src='' alt = ''/>
                <input type = "email" placeholder = "Email"  />
            </div>
            <div className = 'input'>
                <img src='' alt = ''/>
                <input type = "password" placeholder = "Password"  />
            </div>
        </div>
        <div className="forget-password"> Forgot Password? <span>click here!</span></div>
        <div className="submit-container"> 
            <div className={action === "login"?"submit gray":"submit"} onclick = {() => {setAction("Sign Up")}}>
                Sign Up
            </div>
            <div className={action === "Sign Up"?"submit gray":"submit"} onclick = {() => {setAction("Login")}}>
                Login
            </div>
        </div>
    </div>
  )
}

export default LoginSignup



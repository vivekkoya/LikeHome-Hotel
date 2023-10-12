
import './App.css';
import LoginSignup from './loginpage/LoginSignup';
import Listings from './listingspage/Listings';
import React from 'react';
import { Router, Routes, Route, Link} from 'react-router-dom';


function App() {
  return (


    <div className="App">
    <h1>LIKE HOME APP</h1>
      <div className="routes">
        <Routes>
            <Route exact path="/" element={<LoginSignup/>}/>
            <Route path="/listings" element={<Listings/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

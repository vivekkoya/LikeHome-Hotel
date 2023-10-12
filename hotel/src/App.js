import './App.css';
import NavBar from './components/NavBar';
import LoginSignup from './loginpage/LoginSignup';
import Listings from './listingspage/Listings';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'


function App() {
  return (
    <>
      <NavBar/>
      <Router>
        <Routes>
          <Route exact path="/login" element={<LoginSignup/>}/>
          <Route exact path="/signup" element={<h1>Sign Up</h1>}/>
          <Route exact path="/viewreservations" element={<h1>User Reservations Page</h1>}/>
          <Route exact path="/hotelviewbookings" element={<h1>Hotel Bookings Page</h1>}/>
          <Route exact path="/" element={<h1>Search Listing Page</h1>}/>
          <Route path="/listings" element={<Listings/>} />
        </Routes>
      </Router>
    </>
)}

export default App;

import './App.css';
import styled from "styled-components";
import NavBar from './components/NavBar';
import Listings from './listingspage/Listings';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { LoginForm } from './components/accountBox/loginForm';
import {AccountBox} from "./components/accountBox";
import ReservationPage from './reservation/ReservationPage';
import MakeReservation from './listingspage/make-reservation';


const AppContainer = styled.div`
  
  height: 100%;
  display: flex;
  // flex-direction: column;
  // align-items: center;
  justify-content: center;
  
`;


function App() {



  return (
    <>
      <NavBar/>
      <Router>
        <Routes>
          <Route  path="/login" element={<AppContainer><AccountBox/></AppContainer>}/>
          <Route  path="/signup" element={<h1>Sign Up</h1>}/>
          <Route  path="/viewreservations" element={<ReservationPage></ReservationPage>}/>
          <Route  path="/hotelviewbookings" element={<h1>Hotel Bookings Page</h1>}/>
          <Route  path="/search" element={<Listings/>}/>
          <Route  path="/" element={<p>home page</p>}/>
          <Route  path="/search/reservation/:id" element={<MakeReservation/>}/>
        </Routes>
      </Router>
    </>
)}

export default App;

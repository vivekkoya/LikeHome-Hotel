import './App.css';
import styled from "styled-components";
import NavBar from './components/NavBar';
import { AccountBox, accountBox } from "./components/accountBox";
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import { LoginForm } from './components/accountBox/loginForm';


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
          <Route exact path="/login" element={<AppContainer><AccountBox/></AppContainer>}/>
          <Route exact path="/signup" element={<h1>Sign Up</h1>}/>
          <Route exact path="/viewreservations" element={<h1>User Reservations Page</h1>}/>
          <Route exact path="/hotelviewbookings" element={<h1>Hotel Bookings Page</h1>}/>
          <Route exact path="/" element={<h1>Search Listing Page</h1>}/>
        </Routes>
      </Router>
    </>
)}

export default App;

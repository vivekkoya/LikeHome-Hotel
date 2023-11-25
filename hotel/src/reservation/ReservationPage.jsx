import React from "react";
import ReservationCard from "./ReservationCard";
import "./reservation.css";
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const ReservationPage = () => {
  const [cookies, setCookies] = useCookies(["users"]);
  const [reservations, setReservations] = useState({
    presentBookings: [],
    pastBookings: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log("start fetch");
      try {
        console.log("starting fetch");
        const response = await fetch(
          `https://hotel-rod6.onrender.com/booking/${cookies.id}`
        );
        if (response.status === 200) {
          console.log("response 200");
          const data = await response.json();
          console.log(data);
          setReservations(data);
        } else {
          console.log(response.status);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData(); // Call the async function here
  }, []);

  return (
    <div className="upcoming-reservation">
      <h2 style={{ color: "white" }}> Upcoming Reservations </h2>
      {reservations.presentBookings.length === 0 ? (
        <p> No upcoming Bookings</p>
      ) : (
        reservations.presentBookings.map((reservation) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            upcoming={true}
          />
        ))
      )}
      <h2 style={{ color: "white" }}> Past Reservations </h2>
      {reservations.pastBookings.length === 0 ? (
        <p> No Past Bookings</p>
      ) : (
        reservations.pastBookings.map((reservation) => (
          <ReservationCard
            key={reservation._id}
            reservation={reservation}
            upcoming={false}
          />
        ))
      )}
    </div>
  );
};

export default ReservationPage;

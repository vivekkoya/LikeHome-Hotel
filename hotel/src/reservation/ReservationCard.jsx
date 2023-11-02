import React, { useState, useEffect } from "react";
import "./card.css";
import LogoList from "./LogoList";
import { FaBed, FaToilet, FaUser } from "react-icons/fa";

const ReservationCard = (Props) => {
  const booking = Props.reservation;
  const [reservation, setReservation] = useState({
    hotel_name: "Hotel Name",
    price: 100,
    location: {
      state: "California",
      city: "San Jose",
      address: "123 Main Street",
    },
    check_in: "3:00pm",
    check_out: "10:00am",
    imgurl: [
      "https://hotelandra.com/wp-content/uploads/2022/01/Andra2483-Andra-Queen-Queen.jpg",
    ],
    start_date: new Date("12-13-2023"),
    end_date: new Date("12-14-2023"),
    room_details: {
      beds: 2,
      bathrooms: 1,
    },
    num_people: 4,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(
          `http://localhost:5001/listing/getListings/${booking.listing}`
        );
        const response = await fetch(
          `http://localhost:5001/listings/getListings/${booking.listing}`
        );
        if (response.status === 200) {
          console.log("response 200");
          const data = await response.json();
          console.log(data[0]);
          console.log(data[0].imgurl);
          await setReservation({
            hotel_name: data[0].hotel_name,
            price: data[0].price,
            location: data[0].location,
            check_in: data[0].check_in,
            check_out: data[0].check_out,
            imgurl: data[0].imgurl,
            start_date: new Date(booking.checkInDate),
            end_date: new Date(booking.checkOutDate),
            room_details: data[0].room_details,
            num_people: data[0].num_people,
            amenities: data[0].amenities,
            accessibility: data[0].accessability,
          });
          console.log(reservation);
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
    <div className="reservation-card">
      <img
        className="reservation-image"
        src={reservation.imgurl[0]}
        alt="reservation photo"
      />
      <div className="info-card">
        <h1>{reservation.hotel_name}</h1>
        <p>
          {reservation.location.address} {reservation.location.city},{" "}
          {reservation.location.state}
        </p>
        <div className="dates-box">
          <div>
            <h2>{reservation.start_date.toLocaleDateString()}</h2>
            <p>Check-in: {reservation.check_in}</p>
          </div>
          <h3>{`\u2192`}</h3>
          <div>
            <h2>{reservation.end_date.toLocaleDateString()}</h2>
            <p>Check-out: {reservation.check_out}</p>
          </div>
          <h2 style={{ margin: "0px 0px 0px 40px" }}>
            {(reservation.end_date - reservation.start_date) / 86400000} night
            {reservation.end_date - reservation.start_date !== 86400000 && "s"}
          </h2>
        </div>
        <div className="descriptor-box">
          <LogoList title="Amenities" list={reservation.amenities} />
          <LogoList title="Accessibilty" list={reservation.accessibility} />
        </div>
        <div className="room-details">
          <div>
            <FaBed />
            <h2>
              {reservation.room_details.beds} Bed
              {reservation.room_details.beds !== 1 && "s"}
            </h2>
          </div>
          <div>
            <FaToilet />
            <h2>
              {reservation.room_details.bathrooms} Bathroom
              {reservation.room_details.bathrooms !== 1 && "s"}
            </h2>
          </div>
          <div>
            <FaUser />
            <h2>
              {reservation.num_people}{" "}
              {reservation.room_details.beds === 1 ? "person" : "people"}
            </h2>
          </div>
        </div>
        <div className="button-row">
          <button className="res-btn">Cancel</button>
          <button className="res-btn">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;

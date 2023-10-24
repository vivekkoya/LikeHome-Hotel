import React from "react";
import "./card.css";
import LogoList from "./LogoList";
import { FaBed, FaToilet, FaUser } from "react-icons/fa";

const ReservationCard = (Props) => {
  const reservation = Props.reservation;
  // const reservation = {
  //     hotel_name: "Hotel Name",
  //     price: 100,
  //     location: {
  //       state: "California",
  //       city: "San Jose",
  //       address: "123 Main Street"
  //     },
  //     check_in: "3:00pm",
  //     check_out: "10:00am",
  //     imgurl: ["https://hotelandra.com/wp-content/uploads/2022/01/Andra2483-Andra-Queen-Queen.jpg"],
  //     start_date: new Date("12/13/20023"),
  //     end_date: new Date("12/14/2023"),
  //     room_details: {
  //       beds: 2,
  //       bathrooms: 1
  //     },
  //     num_people: 4
  //   }

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

import React from "react";
import "./card.css";

const ReservationCard = (Props) => {
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
        src={Props.reservation.imgurl[0]}
        alt="reservation photo"
      />
      <div className="info-card">
        <div className="listing-info ">listing-info</div>
        <div className="reservation-info ">reservation-info</div>
      </div>
    </div>
  );
};

export default ReservationCard;

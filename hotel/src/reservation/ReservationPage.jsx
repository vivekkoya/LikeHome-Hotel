import React from "react";
import ReservationCard from "./ReservationCard";
import "./reservation.css";

const ReservationPage = () => {
  const reservation = {
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
    start_date: new Date("12/13/20023"),
    end_date: new Date("12/14/2023"),
    room_details: {
      beds: 2,
      bathrooms: 1,
    },
    num_people: 4,
  };

  return (
    <div className="upcoming-reservation">
      <ReservationCard reservation={reservation} />
      <ReservationCard reservation={reservation} />
      <ReservationCard reservation={reservation} />
      <ReservationCard reservation={reservation} />
    </div>
  );
};

export default ReservationPage;

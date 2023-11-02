import React from "react";
import ReservationCard from "./ReservationCard";
import "./reservation.css";
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const ReservationPage = () => {
  const [cookies, setCookies] = useCookies(["users"]);
  const [loading, setLoading] = useState(true);
  // const res = {
  //   hotel_name: "Hotel Name",
  //   price: 100,
  //   location: {
  //     state: "California",
  //     city: "San Jose",
  //     address: "123 Main Street",
  //   },
  //   check_in: "3:00pm",
  //   check_out: "10:00am",
  //   imgurl: [
  //     "https://hotelandra.com/wp-content/uploads/2022/01/Andra2483-Andra-Queen-Queen.jpg",
  //   ],
  //   start_date: new Date("12/13/2023"),
  //   end_date: new Date("12/14/2023"),
  //   amenities: [
  //     "Pool",
  //     "Free Wifi",
  //     "Air Conditioning",
  //     "Bar",
  //     "Laundry Facilities",
  //     "Breakfast",
  //     "Gym",
  //   ],
  //   accessibility: [
  //     "WheelChair Accessible",
  //     "Staff Asl Trained",
  //     "Non-smoking",
  //     "Mulitlingual Staff",
  //   ],
  //   room_details: {
  //     beds: 2,
  //     bathrooms: 1,
  //   },
  //   num_people: 4,
  // };
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("start fetch");
      try {
        console.log("starting fetch");
        const response = await fetch(
          `http://localhost:5001/booking/${cookies.id}`
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
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Call the async function here
  }, []);

  return (
    <div className="upcoming-reservation">
      {loading ? (
        <p>Loading reservations...</p>
      ) : reservations.length === 0 ? ( // Check if reservations array is empty
        <p>No reservations found.</p>
      ) : (
        reservations.map((reservation) => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))
      )}
    </div>
  );
};

export default ReservationPage;

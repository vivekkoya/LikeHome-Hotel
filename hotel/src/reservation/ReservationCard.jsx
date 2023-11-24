import React, { useState, useEffect } from "react";
import "./card.css";
import LogoList from "./LogoList";
import { FaBed, FaToilet, FaUser } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-dropdown-select";

const DeleteModal = ({ showModal, closeModal, proceedAction }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <h2>Confirmation</h2>
        <p>Are you sure you want to delete this reservation?</p>
        <div className="button-row">
          <button className="res-btn" onClick={closeModal}>
            Cancel
          </button>
          <button className="res-btn" onClick={proceedAction}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const ReservationCard = (Props) => {
  const booking = Props.reservation;
  console.log(Props.reservation);
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
    original_price: 200,
    daily_price: 200,
  });

  const [start_date, setStart] = useState(reservation.start_date);
  const [end_date, setEnd] = useState(reservation.end_date);

  const fetchData = async () => {
    try {
      console.log(
        `https://hotel-g7hx.onrender.com/listing/getListings/${booking.listing}`
      );
      const response = await fetch(
        `https://hotel-g7hx.onrender.com/listings/getListings/${booking.listing}`
      );
      if (response.status === 200) {
        console.log("response 200");
        const data = await response.json();

        console.log(data.imgurl);
        const start = new Date(booking.checkInDate);
        const end = new Date(booking.checkOutDate);
        await setReservation({
          hotel_name: data.hotel_name,
          price: data.price,
          location: data.location,
          check_in: data.check_in,
          check_out: data.check_out,
          imgurl: data.imgurl,
          start_date: start,
          end_date: end,
          room_details: data.room_details,
          num_people: data.num_people,
          amenities: data.amenities,
          accessibility: data.accessability,
          price: data.price,
          original_price: ((end - start) / 864000000) * data.price,
        });
        setStart(start);
        setEnd(end);
        console.log(reservation);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Call the async function here
  }, []);

  const [adjustment, setAdjustment] = useState(0);
  useEffect(() => {
    const ajust = async () => {
      const result = Math.trunc(
        ((end_date -
          start_date -
          (reservation.end_date - reservation.start_date)) /
          86400000) *
          reservation.price
      );

      setAdjustment(result < 0 ? result * 0.8 : result);
    };

    ajust();
  }, [start_date, end_date]);

  const [editModal, setEditModal] = useState(false);

  const openEdit = () => {
    setEditModal(true);
  };

  const closeEdit = () => {
    setEditModal(false);
  };

  const editReservation = async () => {
    const updateUrl = `https://hotel-g7hx.onrender.com/booking/${booking._id}`;
    const editBookings = {
      checkInDate: start_date,
      checkOutDate: end_date,
      guests: booking.guests,
      listing: booking.listing,
      user: booking.user,
      _id: booking._id,
      _v: booking._v,
    };
    const response = await fetch(updateUrl, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(editBookings),
    });
    if (response.ok) {
      console.log("set reload triggered");
      window.location.href = "/viewreservations";
    } else {
      alert(response.message);
    }
    closeEdit();
  };

  const [deleteModal, setDeleteModal] = useState(false);

  const openDelete = () => {
    setDeleteModal(true);
  };

  const closeDelete = () => {
    setDeleteModal(false);
  };

  const deleteReservation = async () => {
    console.log(booking.listing);
    const deleteUrl = `https://hotel-g7hx.onrender.com/booking/${booking}._id}`;
    fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Booking Deleted, Refresh page to update");
      } else {
        alert(response.message);
      }
    });
    closeDelete();
    window.location.href = "/viewreservations";
  };

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
        {Props.upcoming ? (
          <div className="button-row">
            <button className="res-btn" onClick={openDelete}>
              Cancel
            </button>
            <button className="res-btn" onClick={openEdit}>
              Edit
            </button>
          </div>
        ) : (
          <p></p>
        )}
        <DeleteModal
          showModal={deleteModal}
          closeModal={closeDelete}
          proceedAction={deleteReservation}
        />
        <div className={`modal ${editModal ? "show" : ""}`}>
          <h1> Edit Reservation</h1>
          <div className="modal-content">
            <div className="selector-row">
              <div className="form-item">
                <h3>Check-in</h3>
                <DatePicker
                  selected={start_date}
                  onChange={(date) => setStart(date)}
                  className="date-picker"
                />
              </div>
              <div className="form-item">
                <h3>Check-out</h3>
                <DatePicker
                  selected={end_date}
                  onChange={(date) => setEnd(date)}
                  className="date-picker"
                />
              </div>
            </div>
            <div className="adjustment">
              <h2>
                {" "}
                Price Ajustment {adjustment < 0 ? "-" : "+"}${""}
                {Math.abs(adjustment)}
              </h2>
              <p>
                {" "}
                *the price ajustment will be applied to the credit card used to
                reserve the booking
              </p>
            </div>
            <div className="button-row">
              <button className="res-btn" onClick={closeEdit}>
                Undo
              </button>
              <button className="res-btn" onClick={editReservation}>
                Finish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;

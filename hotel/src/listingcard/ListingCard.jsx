import React from "react";
import "./ListingCard.css";
import stateAbbreviation from "../consts/StateAbbreviations";

const ListingCard = (props) => {
  const listing = props.listing;
  const name = listing.hotel_name;
  const city = listing.location.city;
  const address = listing.location.address;
  const max_people = listing.room_details.max_people;
  const beds = listing.room_details.beds;
  const state = stateAbbreviation[listing.location.state];
  //const rating = listing.rating;
  const price = listing.price;
  const img = listing.imgurl[0];

  console.log(props);

  const handleClick = () => {
    window.location.href = `/search/reservation/${listing._id}/${props.start}/${props.end}`;
  };

  return (
    <div className="listing-card" onClick={handleClick}>
      <div className="listing-image-box">
        <img
          className="listing-image"
          src={`/${img}`}
          alt="Listing Image"
        ></img>
      </div>
      <div className="listing-info">
        <div className="listing-details">
          <h2>{name}</h2>
          <p>
            {address}, {city}
          </p>
        </div>
        <div className="bottom-row">
          <div className="listing-details">
            <h2>{beds} Beds</h2>
            <p>max {max_people} guests</p>
          </div>
          <div className="listing-details">
            <h2>${price}</h2>
            <p>${Math.trunc(price * 1.08)} total</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;

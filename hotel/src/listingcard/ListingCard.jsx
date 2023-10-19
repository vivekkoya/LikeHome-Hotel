import React from "react";
import "./ListingCard.css";
import stateAbbreviation from "../consts/StateAbbreviations";

const ListingCard = (props) => {
  const listing = props.listing;
  const name = listing.hotel_name;
  const city = listing.location.city;
  const state = stateAbbreviation[listing.location.state];
  //const rating = listing.rating;
  const price = listing.price;
  const img = listing.imgurl[0];

  const handleClick = () => {
    window.location.href = `/search/reservation/${listing._id}`;
  };

  return (
    <div className="listing-card" onClick={handleClick}>
      <div className="listing-image-box">
        <img className="listing-image" src={img} alt="Listing Image"></img>
      </div>
      <div className="listing-info">
        <div className="listing-details">
          <div className="listing-name"> {name}</div>
          <div className="listing-city">
            {city}, {state}
          </div>
          <div className="listing-rating">{4.5}</div>
        </div>
        <div className="listing-price">${price}</div>
      </div>
    </div>
  );
};

export default ListingCard;

import React, { useState, useEffect } from "react";
import "./Listings.css";
import ListingCard from "../listingcard/ListingCard";

const Listings = () => {
  const [listings, setListings] = useState([]);
  // const [location, setLocation] = useState(null);
  let searchQuery = "";

  // useEffect(() => {
  //   (async () => {
  //     console.log("start fetch");
  //     try {
  //       const response = await fetch(
  //         "http://localhost:5001/listings/getListings"
  //       );
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setListings(data);
  //        console.log(location);
  //     } catch (error) {
  //       console.error("Fetch error:", error);
  //     }
  //   })();
  // }, [location]);

  const onSearchClick = async () => {
    const search = searchQuery.replace(" ", "%20");
    try {
      const res = await fetch(
        `http://localhost:5001/listings/ListingInCity/${searchQuery}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setListings(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleChange = (event) => {
    searchQuery = event.target.value;
  };
  /* const listings1 = [
    { name: "Marriott", city: "San Jose, CA", rating: "4.7", price: "$150" },
    { name: "Hilton", city: "Santa Clara, CA", rating: "4.3", price: "$175" },
    { name: "Hyatt", city: "Sunnyvale, CA", rating: "4.5", price: "$200" },
    { name: "Motel 6", city: "Cupertino, CA", rating: "3.8", price: "$100" },
    {
      name: "Intercontinental",
      city: "Milpitas, CA",
      rating: "4.9",
      price: "$300",
    },
  ]; */
  return (
    <div className="listings">
      <div className="header-bar">
        <div className="search-bar">
          <input
            className="search-text-field"
            type="text"
            placeholder="Where Would You Like To Go?"
            onChange={handleChange}
          />
          <button
            className="search-button"
            type="submit"
            onClick={onSearchClick}
          >
            Search
          </button>
        </div>
        <h2>Current Listings</h2>
      </div>
      <div className="listing-cards">
        {listings.map((listing) => (
          <ListingCard listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default Listings;

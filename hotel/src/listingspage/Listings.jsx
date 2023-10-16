import React, { useState, useEffect } from "react";
import "./Listings.css";
import ListingCard from "../listingcard/ListingCard";

const Listings = () => {
  const [listings, setListings] = useState([]);
  //const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      console.log("start fetch");
      try {
        const response = await fetch(
          "http://localhost:5001/listings/getListings"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setListings(data);
        console.log(location);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    })();
  }, [location]);

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
      <h2>Current Listings</h2>
      <div className="listing-cards">
        {listings.map((listing) => (
          <ListingCard listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default Listings;

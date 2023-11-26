import React, { useState, useEffect } from "react";
import "./Listings.css";
import ListingCard from "../listingcard/ListingCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarDay, FaGlobeAmericas } from "react-icons/fa";

const Listings = () => {
  const [listings, setListings] = useState([]);
  // const [location, setLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  // below are all variables used for filtering
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [beds, setBeds] = useState("");
  const [people, setPeople] = useState("");
  const [amenities, setAmenities] = useState("");
  const [accessibility, setAccessibility] = useState("");
  const [sortPrice, setSortPrice] = useState(true);
  const [sortBed, setSortBed] = useState(false);
  const [sortPeople, setSortPeople] = useState(false);
  const [showFilterBox, setShowFilterBox] = useState(false);

  const handleSortChange = (value) => {
    setSortPrice(false);
    setSortBed(false);
    setSortPeople(false);
    if (value === "price") {
      setSortPrice(true);
    } else if (value === "beds") {
      setSortBed(true);
    } else {
      setSortPeople(true);
    }
  };

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
        `http://localhost:5001/listings/ListingInCity/${search}`,
        {
          method: "POST",
        }
      );
      if (!res.ok) {
        alert(`HTTP error! Status: ${res.message}`);
      }
      const data = await res.json();
      setListings(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const currentDate = new Date();
  const weekFromToday = new Date();
  weekFromToday.setDate(currentDate.getDate() + 7);
  const [start, setStart] = useState(currentDate);
  const [end, setEnd] = useState(weekFromToday);

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedAccessibility, setSelectedAccessibility] = useState([]);
  const [sliderValues, setSliderValues] = useState({
    price: 750,
    beds: 2,
    people: 2,
  });

  const handleCheckboxChange = (category, value) => {
    if (category === "amenities") {
      setSelectedAmenities((prev) => {
        if (prev.includes(value)) {
          return prev.filter((item) => item !== value);
        } else {
          return [...prev, value];
        }
      });
    } else if (category === "accessibility") {
      setSelectedAccessibility((prev) => {
        if (prev.includes(value)) {
          return prev.filter((item) => item !== value);
        } else {
          return [...prev, value];
        }
      });
    }
  };
  const handleSliderChange = (name, value) => {
    setSliderValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const toggleFilterBox = () => {
    setShowFilterBox((prevState) => !prevState);
  };

  const applyChanges = async () => {
    console.log("Selected Amenities:", selectedAmenities);
    console.log("Selected Accessibility:", selectedAccessibility);
    console.log("Slider Values:", sliderValues);

    const search = searchQuery.replace(" ", "%20");
    const requestBody = {
      priceMin: 0,
      priceMax: sliderValues.price,
      beds: sliderValues.beds,
      people: sliderValues.people,
      amenities: selectedAmenities,
      accessibility: selectedAccessibility,
    };
    if (sortPrice) {
      requestBody["sortBy"] = "priceAsc";
    } else if (sortBed) {
      requestBody["sortBy"] = "bedsAsc";
    } else if (sortPeople) {
      requestBody["sortBy"] = "peopleAsc";
    }

    try {
      const res = await fetch(
        `http://localhost:5001/listings/ListingInCity/${search}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await res.json();
      setListings(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  //used to inbed icon in the datepicker
  const CustomDatePickerInput = ({ value, onClick, placeholderText }) => (
    <div className="my-datepicker" onClick={onClick}>
      <FaCalendarDay />
      {value === "" ? (
        <p style={{ color: "#A9A9A9" }}>{placeholderText}</p>
      ) : (
        <p>{value}</p>
      )}
    </div>
  );

  return (
    <div className="listings" style={{ "margin-top": "6rem" }}>
      <div className="header-bar">
        <div className="search-bar">
          <input
            className="search-text-field"
            type="text"
            placeholder="Where Would You Like To Go?"
            onChange={handleChange}
          />
          <FaGlobeAmericas className="search-icon" />
        </div>
        <DatePicker
          selected={start}
          onChange={(date) => setStart(date)}
          customInput={<CustomDatePickerInput placeholderText="Check-in" />}
        />
        <DatePicker
          placeholder="Check-out"
          selected={end}
          onChange={(date) => setEnd(date)}
          customInput={<CustomDatePickerInput placeholderText="Check-out" />}
        />
        <div className="form-item">
          <button
            className="search-button"
            type="submit"
            onClick={onSearchClick}
          >
            Search
          </button>
        </div>
        <button
          className="search-button"
          onClick={toggleFilterBox}
          style={{ marginRight: "10px" }}
        >
          Filters
        </button>
      </div>
      {showFilterBox && (
        <div className="filterbox">
          <h2>Filter Options</h2>
          <div>
            <label>
              Max Price:
              <input
                type="range"
                min="100"
                max="1500"
                step="1"
                value={sliderValues.price}
                onChange={(e) =>
                  handleSliderChange("price", parseInt(e.target.value))
                }
              />
              {sliderValues.price}
            </label>
          </div>

          <div>
            <label>
              Beds:
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={sliderValues.beds}
                onChange={(e) =>
                  handleSliderChange("beds", parseInt(e.target.value))
                }
              />
              {sliderValues.beds}
            </label>
          </div>

          <div>
            <label>
              People:
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={sliderValues.people}
                onChange={(e) =>
                  handleSliderChange("people", parseInt(e.target.value))
                }
              />
              {sliderValues.people}
            </label>
          </div>

          <h2> Sort By</h2>
          <label>
            <input
              type="checkbox"
              value={"price"}
              checked={sortPrice}
              onChange={() => handleSortChange("price")}
            ></input>
            price
          </label>
          <label>
            <input
              type="checkbox"
              value={"beds"}
              checked={sortBed}
              onChange={() => handleSortChange("beds")}
            ></input>
            bed
          </label>
          <label>
            <input
              type="checkbox"
              value={"people"}
              checked={sortPeople}
              onChange={() => handleSortChange("people")}
            ></input>
            people
          </label>
          
          <h2>Amenities</h2>
            {[
              "Pool",
              "Free Wifi",
              "Air Conditioning",
              "Bar",
              "Laundry Facilities",
              "Breakfast",
              "Gym",
            ].map((amenity) => (
              <label key={amenity}>
                <input
                  type="checkbox"
                  value={amenity}
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => handleCheckboxChange("amenities", amenity)}
                  
                />
                {amenity}
              </label>
            ))}

          <h2>Accessibility</h2>
            {[
              "WheelChair Accessible",
              "Staff Asl Trained",
              "Non-smoking",
              "Mulitlingual Staff",
            ].map((accessibility) => (
              <label key={accessibility}>
                <input
                  type="checkbox"
                  value={accessibility}
                  checked={selectedAccessibility.includes(accessibility)}
                  onChange={() =>
                    handleCheckboxChange("accessibility", accessibility)
                  }
                />
                {accessibility}
              </label>
            ))}

               <button
            onClick={applyChanges}
            styles={{ padding: "4px 8px;", "margin-bottom": "8px" }}
          >
            Apply Changes
          </button>
          </div>
       
    
        )}
        <div className="listing-cards">
          {listings.map((listing) => (
            <ListingCard listing={listing} start={start} end={end} />
          ))}
        </div>
    </div>
  );
};

export default Listings;

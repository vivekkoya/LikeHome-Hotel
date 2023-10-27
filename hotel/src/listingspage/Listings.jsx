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
        `http://localhost:5001/listings/ListingInCity/${search}`
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
    setSearchQuery(event.target.value);
  };

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [inputValues, setInputValues] = useState({ beds: '', people: '' });
  const [sliderValues, setSliderValues] = useState({ slider1: 0 });
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedCheckboxes([...selectedCheckboxes, value]);
    } else {
      setSelectedCheckboxes(selectedCheckboxes.filter(option => option !== value));
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleSliderChange = (event) => {
    const { name, value } = event.target;
    setSliderValues({
      ...sliderValues,
      [name]: parseInt(value, 10),
    });
  };
  const applyChanges = () => {
    console.log('Selected checkboxes:', selectedCheckboxes);
    console.log('Slider values:', sliderValues);
    console.log('Input values:', inputValues);
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
    <div className="listings">
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
      </div>
      <div className="find-body">
        <div className="filterbox">
          <h2>Filter Options</h2>
          <label>
            Price
            <input
              type="range"
              name="slider1"
              min="100"
              max="1000"
              value={sliderValues.slider1}
              onChange={handleSliderChange}
            />
            <div>Value: {sliderValues.slider1}</div>
          </label>
          <label>
            Beds:
            <input
              type="text"
              name="beds"
              value={inputValues.beds}
              onChange={handleInputChange}
            />
          </label>
          <label>
            People:
            <input
              type="text"
              name="people"
              value={inputValues.people}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <input
              type="checkbox"
              value="Pool"
              checked={selectedCheckboxes.includes('Pool')}
              onChange={handleCheckboxChange}
            />
            Pool
          </label>
          <label>
            <input
              type="checkbox"
              value="Gym"
              checked={selectedCheckboxes.includes('Gym')}
              onChange={handleCheckboxChange}
            />
            Gym
          </label>
          <label>
            <input
              type="checkbox"
              value="Wheelchair Accessible"
              checked={selectedCheckboxes.includes('Wheelchair Accessible')}
              onChange={handleCheckboxChange}
            />
            Wheelchair Accessible
          </label>
          <button onClick={applyChanges}>Apply Changes</button>
        </div>        <div className="listing-cards">
          {listings.map((listing) => (
            <ListingCard listing={listing} start={start} end={end} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listings;

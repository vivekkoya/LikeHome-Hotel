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

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedAccessibility, setSelectedAccessibility] = useState([]);
  const [sliderValues, setSliderValues] = useState({ price: 750, beds: 2, people: 2 });

  const handleCheckboxChange = (category, value) => {
    if (category === 'amenities') {
      setSelectedAmenities((prev) => {
        if (prev.includes(value)) {
          return prev.filter((item) => item !== value);
        } else {
          return [...prev, value];
        }
      });
    } else if (category === 'accessibility') {
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
  const applyChanges = () => {
    console.log('Selected Amenities:', selectedAmenities);
    console.log('Selected Accessibility:', selectedAccessibility);
    console.log('Slider Values:', sliderValues);
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
          <div>
            <label>
              Price:
              <input
                type="range"
                min="100"
                max="1000"
                step="1"
                value={sliderValues.price}
                onChange={(e) => handleSliderChange('price', parseInt(e.target.value))}
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
                max="5"
                step="1"
                value={sliderValues.beds}
                onChange={(e) => handleSliderChange('beds', parseInt(e.target.value))}
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
                onChange={(e) => handleSliderChange('people', parseInt(e.target.value))}
              />
              {sliderValues.people}
            </label>
          </div>
          <hr />
          <h3>Amenities</h3>
          <div>
            {['Pool', 'Free Wifi', 'Air Conditioning', 'Bar', 'Laundry Facilities', 'Breakfast', 'Gym'].map((amenity) => (
              <label key={amenity}>
                <input
                  type="checkbox"
                  value={amenity}
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => handleCheckboxChange('amenities', amenity)}
                />
                {amenity}
              </label>
            ))}
          </div>

          <hr />

          <h3>Accessibility</h3>
          <div>
            {['WheelChair Accessible', 'Staff Asl Trained', 'Non-smoking', 'Mulitlingual Staff'].map((accessibility) => (
              <label key={accessibility}>
                <input
                  type="checkbox"
                  value={accessibility}
                  checked={selectedAccessibility.includes(accessibility)}
                  onChange={() => handleCheckboxChange('accessibility', accessibility)}
                />
                {accessibility}
              </label>
            ))}
          </div>

          <hr />
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

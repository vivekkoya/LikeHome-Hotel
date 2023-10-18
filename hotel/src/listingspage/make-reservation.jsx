import React, { useState, useEffect } from "react";
import "./Reservation.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-dropdown-select";

const MakeReservation = () => {
  const details = {
    name: "Hotel Name",
    city: "San Jose",
    address: "123 Main Street",
    amenities: ["Spa", "Pool", "Continental Breakfast", "Free Wifi"],
    accessibility: ["Elevator", "WheelChair Accesible", "ASL Trained Staff"],
    price: 325,
    max_people: 3,
    start: new Date("12/11/2023"),
    end: new Date("12/12/2023"),
    img_url:
      "https://hoteldel.com/wp-content/uploads/2021/03/hotel-del-coronado-views-suite-K1TOS1-K1TOJ1-1600x1000-1.jpg",
  };

  const [options, setOptions] = useState([]);
  const [people, setPeople] = useState([
    { label: details.max_people, value: details.max_people },
  ]);
  const [start, setStart] = useState(details.start);
  const [end, setEnd] = useState(details.end);

  const generateOptions = (maxPeople) => {
    const newOptions = [];
    for (let i = 1; i <= maxPeople; i++) {
      newOptions.push({
        label: `${i}`,
        value: i,
      });
    }
    return newOptions;
  };

  useEffect(() => {
    const newOptions = generateOptions(details.max_people);
    setOptions(newOptions);
  }, [details.max_people]);

  return (
    <div className="reservation-page">
      <div className="hotelbox">
        <img className="hotel-img" src={details.img_url} />
        <div className="image-box">
          <div className="info-form">
            <div className="form-item">
              <h3>Check-in</h3>
              <DatePicker
                selected={start}
                onChange={(date) => setStart(date)}
                className="date-picker"
              />
            </div>
            <div className="form-item">
              <h3>Check-out</h3>
              <DatePicker
                selected={end}
                onChange={(date) => setEnd(date)}
                className="date-picker"
              />
            </div>
            <div className="form-item">
              <h3>People</h3>
              <Select
                options={options}
                onChange={(values) => setPeople(values)}
                color="orange"
                className="select-box"
              />
            </div>
          </div>
          <div className="line-after"></div>
          <div className="title">
            <div>
              <h1>{details.name}</h1>
              <p className="address">
                {details.city}, {details.address}{" "}
              </p>
            </div>
            <div>
              <h1>${details.price}</h1>
              <p className="address"> per person per night</p>
            </div>
          </div>
          <div className="line-after"></div>
          <div className="listers">
            <div className="items-list">
              <h2>Amenities</h2>
              <ul>
                {details.amenities.map((option) => (
                  <li key={option}>{option}</li>
                ))}
              </ul>
            </div>
            <div className="items-list">
              <h2>Accessibility</h2>
              <ul>
                {details.accessibility.map((option) => (
                  <li key={option}>{option}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="line-after"></div>
          <div className="price-people">
            <p> {(end - start) / 86400000} nights</p>
            <p>
              Total: $
              {details.price * people[0].value * ((end - start) / 86400000)}
            </p>
          </div>
        </div>
      </div>
      <div className="payment-box"></div>
    </div>
  );
};

export default MakeReservation;

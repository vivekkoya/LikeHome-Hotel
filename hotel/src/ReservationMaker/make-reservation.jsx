import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Reservation.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-dropdown-select";
import LogoList from "../reservation/LogoList";
import { useCookies } from "react-cookie";
import "./styles.css";

const MakeReservation = () => {
  const [cookies, setStates] = useCookies(["users"]);
  const { id, StartDate, EndDate } = useParams();
  const [details, setDetails] = useState({
    // Provide initial values for properties
    hotel_name: "Default Name",
    location: {
      city: "Name",
      address: "address",
    },
    amenities: [],
    accessability: [],
    price: 0,
    room_details: {
      max_people: 1,
    },
    imgurl: ["/images/Listing1.jpeg"],
  });

  useEffect(() => {
    (async () => {
      console.log("start fetch");
      try {
        const response = await fetch(
          `http://localhost:5001/listings/getListings/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        await setDetails(data);
        console.log(data);
        console.log(details);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    })();
  }, [id]);

  const [options, setOptions] = useState([]);
  const [people, setPeople] = useState([
    {
      label: 1,
      value: 1,
    },
  ]);
  const [start, setStart] = useState(new Date(StartDate));
  const [end, setEnd] = useState(new Date(EndDate));

  const generateOptions = (maxPeople) => {
    console.log(details);
    const newOptions = [];
    for (let i = 1; i <= maxPeople; i++) {
      newOptions.push({
        label: `${i}`,
        value: i,
      });
    }
    return newOptions;
  };

  const [payEmail, setPayEmail] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [cvc, setCVC] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("United States");
  const [zipcode, setZipcode] = useState("");

  useEffect(() => {
    const newOptions = generateOptions(details.room_details.max_people);
    setOptions(newOptions);
  }, [details.room_details.max_people]);

  const handleReserve = async () => {
    if (!payEmail || !cardNum || !expireDate || !cvc || !name || !zipcode) {
      alert("missing information");
      return;
    }
    console.log(people);
    console.log(cookies.id);
    const booking = {
      user: cookies.id,
      listing: id,
      checkInDate: start,
      checkOutDate: end,
      guests: people[0].value,
    };
    console.log(booking);
    const res = await fetch("http://localhost:5001/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ booking }),
    });
    if (res.status === 201) {
      window.location.href = "/viewreservations";
    } else if (res.status === 401) {
      alert(
        "You Already Have a Reservation for a portion of this stay. Please edit / remove that booking before making new reservation"
      );
    } else {
      alert("API error");
    }
  };

  return (
    <div className="reservation-page" style={{ "margin-top": "6rem" }}>
      <div className="hotelbox">
        <img
          className="hotel-img"
          src={`${details.imgurl[0]}`}
          alt="image note loaded"
        />
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
              <h1>{details.hotel_name}</h1>
              <p className="address">
                {details.location.city}, {details.location.address}{" "}
              </p>
            </div>
            <div>
              <h1>${details.price}</h1>
              <p className="address"> per night</p>
            </div>
          </div>
          <div className="line-after"></div>
          <div className="listers">
            <LogoList title="Amenities" list={details.amenities} />
            <LogoList title="Accessibility" list={details.accessability} />
          </div>
          <div className="line-after"></div>
          <div className="price-people">
            <p> {Math.trunc((end - start) / 86400000)} nights</p>
            <p>
              {" "}
              Earn {Math.trunc(
                details.price * ((end - start) / 86400000) * 12
              )}{" "}
              points!
            </p>
            <p>
              Total: $
              {Math.trunc(details.price * ((end - start) / 86400000) * 1.08)}
            </p>
          </div>
        </div>
      </div>
      <div className="payment-box">
        <div>
          <p>Email</p>
          <input
            type="email"
            value={payEmail}
            onChange={(event) => setPayEmail(event.target.value)}
            placeholder="john.doe@email.com"
          ></input>
        </div>
        <div>
          <p>Card Information</p>
          <input
            placeholder="1234 1234 1234 1234"
            onChange={(event) => setCardNum(event.target.value)}
            value={cardNum}
          ></input>
          <div className="row-input">
            <input
              className="half-input"
              value={expireDate}
              onChange={(event) => setExpireDate(event.target.value)}
              placeholder="MM/YY"
            ></input>
            <input
              className="half-input"
              value={cvc}
              onChange={(event) => setCVC(event.target.value)}
              placeholder="CVC"
            ></input>
          </div>
        </div>
        <div>
          <p>Name on card</p>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="John Doe"
          ></input>
        </div>
        <div>
          <p>Country or region</p>
          <input
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          ></input>
          <input
            value={zipcode}
            onChange={(event) => setZipcode(event.target.value)}
            placeholder="ZIP"
          ></input>
        </div>
        <button className="reserve-button" onClick={handleReserve}>
          Reserve
        </button>
      </div>
    </div>
  );
};

export default MakeReservation;

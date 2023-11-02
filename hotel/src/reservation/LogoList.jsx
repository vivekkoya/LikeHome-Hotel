import React from "react";
import "./list.css";
import {
  FaSwimmer,
  FaWifi,
  FaSnowflake,
  FaGlassMartini,
  FaTshirt,
  FaUtensils,
  FaWeight,
  FaWheelchair,
  FaSignLanguage,
  FaSmokingBan,
  FaLanguage,
} from "react-icons/fa";

const LogoList = (Props) => {
  console.log(Props.list);
  if (!Props.list) {
    return <p>no list</p>;
  }
  const textLogoPairs = new Map();
  textLogoPairs.set("Pool", <FaSwimmer />);
  textLogoPairs.set("Free Wifi", <FaWifi />);
  textLogoPairs.set("Air Conditioning", <FaSnowflake />);
  textLogoPairs.set("Bar", <FaGlassMartini />);
  textLogoPairs.set("Laundry Facilities", <FaTshirt />);
  textLogoPairs.set("Breakfast", <FaUtensils />);
  textLogoPairs.set("Gym", <FaWeight />);
  textLogoPairs.set("WheelChair Accessible", <FaWheelchair />);
  textLogoPairs.set("Staff Asl Trained", <FaSignLanguage />);
  textLogoPairs.set("Non-smoking", <FaSmokingBan />);
  textLogoPairs.set("Mulitlingual Staff", <FaLanguage />);

  return (
    <div className="items-list">
      <h2>{Props.title}</h2>
      <ul>
        {Props.list.map((item) => (
          <li key={item}>
            <div className="data-row">
              {textLogoPairs.get(item)} {/* Render the icon */}
              <p> {item} </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogoList;

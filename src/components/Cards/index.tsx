import React from "react";
import { data } from "../../helpers/lostPhones";
import MapComponent from "../Map";
import "./index.css";
import image from "../Img/Fobj.png";

interface PhoneData {
  model: string;
  date: string;
  color: string;
  address: string;
}

const CardComponent: React.FC = () => {
  return (
    <div className="card-main">
      {data.map((item: PhoneData, index: number) => (
        <div key={index} className="card-container">
          <div className="card-data-container">
            <div className="card-text">
              <h3>{item.model}</h3>
              <span>{item.date}</span>
              <span>{item.color}</span>
            </div>
            <div className="image-container">
              <img src={image} alt="" className="images" />
            </div>
          </div>
          <div className="map-container">
            <MapComponent address={item.address} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardComponent;

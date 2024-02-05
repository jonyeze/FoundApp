import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import imgHome from "../../Assets/Img/Found&Objects.png";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-text-center">
          <h1 className="home-title">Busca lo que perdiste</h1>
          <div className="home-grid-container">
            <div className="home-button-column">
              <Link to="/search">
                <button className="home-button">Buscar</button>
              </Link>
            </div>
            <div className="home-button-column">
              <button className="home-button">Encontré un objeto</button>
            </div>
          </div>
        </div>
      </div>
      <div className="home-img-container">
        <img src={imgHome} alt="imgHome" className="home-imgHome" />
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-text-center">
          <h1 className="home-title">Perdiste algo?</h1>
          <div className="home-grid-container">
            <div className="home-button-column">
              <Link to="/search">
                <button className="home-button">Buscar</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="home-text-center">
          <h1 className="home-title">Encontraste algo?</h1>
          <div className="home-grid-container">
            <div className="home-button-column">
              <button className="home-button">Encontré un objeto</button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <span className="footer-span">Contactanos</span>
        <span className="footer-span">Todos los derechos reservados 2024</span>
      </div>
    </div>
  );
};

export default Home;

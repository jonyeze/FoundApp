import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container">
      <h1 className="text-center">Busca lo que perdiste</h1>
      <div className="grid-container">
        <div className="button-column">
        <Link to="/search"> {/* Usa el componente Link para crear un enlace a "/search" */}
            <button className="button">Buscar</button>
          </Link>
        </div>
        <div className="button-column">
          <button className="button">Encontre un objeto</button>
        </div>
      </div>
    </div>
  );
};
  
  export default Home;
  
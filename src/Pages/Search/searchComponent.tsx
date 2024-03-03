import React, { useState } from 'react';
import './searchComponent.css';
import PhoneSearch from './phoneSearch/phoneSearch';
import DniSearch from './dniSearch/dniSearch';
import CashSearch from './cashSearch/cashSearch';
import ClothingSearch from './clothingSearch/clothingSearch';

const SearchComponent: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="found-items-container">
      <h1>Elige una de las opciones</h1>
      <form>
        <div>
          <label htmlFor="select">Selecciona: </label>
          <select
            id="select"
            value={selectedOption}
            onChange={handleSelectChange}
            className="rounded-input"
          >
            <option value="">Selecciona...</option>
            <option value="dni">DNI</option>
            <option value="phone">Celular</option>
            <option value="cash">Dinero</option>
            <option value="clothing">Indumentaria</option>
            
          </select>
        </div>
      </form>
     
      {selectedOption === 'phone' && <PhoneSearch />}
      {selectedOption === 'dni' && <DniSearch/>}
      {selectedOption === 'cash' && <CashSearch/>}
      {selectedOption === 'clothing' && <ClothingSearch/>}
    </div>
  );
};

export default SearchComponent;

import React, { useState } from 'react';
import './foundItems.css';
import CashForm from './cashForm/cashForm';
import ClothingForm from './clothingForm/clothingForm';
import DniForm from './dniForm/dniForm';
import PhoneForm from './phoneForm/phoneForm';

const FoundItems: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="found-items-container">
      <h1>elegi una de las opciones</h1>
      <form>
        <div>
          <label htmlFor="select">Selecciona :  </label>
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

      {selectedOption === 'dni' && <DniForm />}
      {selectedOption === 'phone' && <PhoneForm />}
      {selectedOption === 'cash' && <CashForm />}
      {selectedOption === 'clothing' && <ClothingForm />}
    </div>
  );
};

export default FoundItems;

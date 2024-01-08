import React, { useState } from 'react';
import './Search.css';

import DniOption from './Dni/DniOption';
import DinerOption from './Diner/DinerOption';
import ClothingOption from './Clothing/ClothingOption';
import PhoneOption from './Phone/PhoneOption';

const Search: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('phone');
  const [inputValue, setInputValue] = useState<string>('');
  const [nameValue, setNameValue] = useState<string>('');
  const [dinerValue, setDinerValue] = useState<string>('');
  const [clothingValue, setClothingValue] = useState<string>('');
  const [phoneValue, setPhoneValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.slice(0, 30);
    setInputValue(newValue);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.slice(0, 30);
    setNameValue(newValue);
  };
  const handledinerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value.slice(0, 200);
    setDinerValue(newValue);
  };
  const handleClothingChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value.slice(0, 200);
    setClothingValue(newValue);
  };
  const handlePhoneChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value.slice(0, 200);
    setPhoneValue(newValue);
  };



  return (
    <div className="container">
      <h1 className="text-center">Agrega datos del objeto que perdiste</h1>
      <select
        value={selectedOption}
        onChange={(event) => setSelectedOption(event.target.value)}
        className="rounded-input"
      >
        <option value="">Selecciona una opción</option>
        <option value="dni">DNI</option>
        <option value="diner">Dinero</option>
        <option value="clothing">Indumentaria</option>
        <option value="phone">Celular</option>
      </select>
      {/* Renderiza la opción seleccionada */}
      {selectedOption === 'dni' && (
        <DniOption  inputValue={inputValue}  nameValue={nameValue} handleChange={handleChange}  handleNameChange={handleNameChange}/>
      )}
      {selectedOption === 'diner' && (
        <DinerOption dinerValue={dinerValue} handledinerChange={handledinerChange} />
      )}
      {selectedOption === 'clothing' && (
        <ClothingOption clothingValue={clothingValue} handleClothingChange={handleClothingChange} />
      )}
      {selectedOption === 'phone' && (
        <PhoneOption phoneValue={phoneValue} handlePhoneChange={handlePhoneChange} />
      )}
    </div>
  );
};

export default Search;

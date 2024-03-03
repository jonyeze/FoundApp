import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from '../../../firebase/firebaseConfig';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const PhoneForm: React.FC = () => {
  const [inputs, setInputs] = useState({
    model: '',
    color: '',
    date: new Date(),
    information: '',
    location: '',
    map: '',
  });

  const handleInputChange = (key: string, value: string | Date | null) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [key]: value instanceof Date ? value : (value === null ? '' : value.toString()),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Datos ingresados:', inputs);

    try {
      const docRef = await addDoc(collection(firestore, 'Phone'), inputs);
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }

    setInputs({
      model: '',
      color: '',
      date: new Date(),
      information: '',
      location: '',
      map: '',
    });
  };

  return (
    <div className="found-items-container">
      <h1>Ingresa los datos del celular que encontraste</h1>
      <form onSubmit={handleSubmit}>
        {/* Inputs de Phone */}
        <div>
          <label htmlFor="model">Modelo:</label>
          <input
            type="text"
            id="model"
            value={inputs.model}
            onChange={(e) => handleInputChange('model', e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="color">Color:</label>
          <input
            type="text"
            id="color"
            value={inputs.color}
            onChange={(e) => handleInputChange('color', e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Fecha Donde Se Encontro:</label>
          <DatePicker
            id="date"
            selected={inputs.date}
            onChange={(date: Date | null) => handleInputChange('date', date)}
            required
          />
        </div>
        <div>
          <label htmlFor="information">Informacion Adicional:</label>
          <input
            type="text"
            id="information"
            value={inputs.information}
            onChange={(e) => handleInputChange('information', e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Lugar De Encuentro:</label>
          <input
            type="text"
            id="location"
            value={inputs.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="map">Mapa:</label>
          <input
            type="text"
            id="map"
            value={inputs.map}
            onChange={(e) => handleInputChange('map', e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PhoneForm;

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from '../../../firebase/firebaseConfig';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const ClothingForm: React.FC = () => {
  const [inputs, setInputs] = useState({
    brand: '',
    date: new Date(),
    description: '',
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
      const docRef = await addDoc(collection(firestore, 'Clothing'), inputs);
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }

    setInputs({
      brand: '',
      date: new Date(),
      description: '',
      map: '',
    });
  };

  return (
    <div className="found-items-container">
      <h1>Ingresa los datos de Clothing</h1>
      <form onSubmit={handleSubmit}>
        {/* Inputs de Clothing */}
        <div>
          <label htmlFor="brand">Marca:</label>
          <input
            type="text"
            id="brand"
            value={inputs.brand}
            onChange={(e) => handleInputChange('brand', e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Fecha:</label>
          <DatePicker
            id="date"
            selected={inputs.date}
            onChange={(date: Date | null) => handleInputChange('date', date)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Descripcion:</label>
          <input
            type="text"
            id="description"
            value={inputs.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Mapa:</label>
          <input
            type="text"
            id="location"
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

export default ClothingForm;

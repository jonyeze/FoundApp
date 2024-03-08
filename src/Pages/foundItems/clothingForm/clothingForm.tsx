import React, { useState, useEffect } from 'react';
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

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleInputChange = (key: string, value: string | Date | null) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [key]: value instanceof Date ? value : (value === null ? '' : value.toString()),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowConfirmation(true);
  };

  const handleSave = async () => {
    try {
      const docRef = await addDoc(collection(firestore, 'Clothing'), inputs);
      console.log('Document written with ID: ', docRef.id);
      setInputs({
        brand: '',
        date: new Date(),
        description: '',
        map: '',
      }); // Limpiar los campos después de guardar
      setShowConfirmation(false);
      setSuccessMessage('¡Los datos se guardaron exitosamente!');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleDelete = () => {
    setInputs({
      brand: '',
      date: new Date(),
      description: '',
      map: '',
    });
    setShowConfirmation(false);
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div className="found-items-container">
      {showConfirmation ? (
        <div className="submitted-data">
          <h2 className="data">Prenda de ropa a agregar</h2>
          <div className="data">
            <div className="label">Marca:</div>
            <div className="value">{inputs.brand}</div>
          </div>
          <div className="data">
            <div className="label">Fecha:</div>
            <div className="value">{inputs.date.toLocaleDateString()}</div>
          </div>
          <div className="data">
            <div className="label">Descripción:</div>
            <div className="value">{inputs.description}</div>
          </div>
          <div className="data">
            <div className="label">Mapa:</div>
            <div className="value">{inputs.map}</div>
          </div>
          <div className="data">
            <button onClick={handleDelete}>Eliminar datos</button>
            <button onClick={handleSave}>Guardar datos</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="description">Descripción:</label>
            <input
              type="text"
              id="description"
              value={inputs.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
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
          <button type="submit">Agregar</button>
        </form>
      )}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
};

export default ClothingForm;

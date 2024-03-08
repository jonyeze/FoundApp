import React, { useState, useEffect } from 'react';
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

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleInputChange = (key: string, value: string | Date | null) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [key]: value instanceof Date ? value : (value === null ? '' : value.toString()),
    }));
  };

  const handleSave = async () => {
    try {
      const docRef = await addDoc(collection(firestore, 'Phone'), inputs);
      console.log('Document written with ID: ', docRef.id);
      setInputs({
        model: '',
        color: '',
        date: new Date(),
        information: '',
        location: '',
        map: '',
      }); // Limpiar los campos después de guardar
      setShowConfirmation(false);
      setSuccessMessage('¡Los datos se guardaron correctamente!');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleDelete = () => {
    setInputs({
      model: '',
      color: '',
      date: new Date(),
      information: '',
      location: '',
      map: '',
    });
    setShowConfirmation(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowConfirmation(true);
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
          <h2 className="data">Documento a agregar</h2>
          <div className="data">
            <div className="label">Modelo:</div>
            <div className="value">{inputs.model}</div>
          </div>
          <div className="data">
            <div className="label">Color:</div>
            <div className="value">{inputs.color}</div>
          </div>
          <div className="data">
            <div className="label">Fecha Donde Se Encontro:</div>
            <div className="value">{inputs.date.toLocaleDateString()}</div>
          </div>
          <div className="data">
            <div className="label">Informacion Adicional:</div>
            <div className="value">{inputs.information}</div>
          </div>
          <div className="data">
            <div className="label">Lugar De Encuentro:</div>
            <div className="value">{inputs.location}</div>
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
          <button type="submit">Agregar</button>
        </form>
      )}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
};

export default PhoneForm;

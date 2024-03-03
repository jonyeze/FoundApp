import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import firebaseConfig from '../../../firebase/firebaseConfig';
import 'react-datepicker/dist/react-datepicker.css';
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const PhoneForm: React.FC = () => {
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [phoneData, setPhoneData] = useState<any[]>([]);

  useEffect(() => {
    const fetchModels = async () => {
      const phoneCollection = collection(firestore, 'Phone');
      const phoneSnapshot = await getDocs(phoneCollection);
      const modelsData = phoneSnapshot.docs.map((doc) => doc.data().model);
      setModels(modelsData);
    };
    fetchModels();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedModel) {
        const phoneCollectionQuery = query(collection(firestore, 'Phone'), where('model', '==', selectedModel));
        const phoneSnapshot = await getDocs(phoneCollectionQuery);
        const data = phoneSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPhoneData(data);
      } else {
        setPhoneData([]);
      }
    };
    fetchData();
  }, [selectedModel]);

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(event.target.value);
  };

  return (
    <div>
      <div className="found-items-container">
        <h1>Ingresa los datos del celular que encontraste</h1>
        <form>
          {/* Select para el modelo */}
          <div>
            <label htmlFor="model">Modelo:</label>
            <select
              id="model"
              value={selectedModel}
              onChange={handleModelChange}
              required
            >
              <option value="">Selecciona un modelo...</option>
              {models.map((model, index) => (
                <option key={index} value={model}>{model}</option>
              ))}
            </select>
          </div>
         
        </form>
      </div>
      {/* Sección para mostrar resultados */}
      {phoneData.length > 0 && (
        <div className="phone-search-results">
          <h2>Resultados para el modelo {selectedModel}:</h2>
          <ul>
            {phoneData.map((phone) => (
              <li key={phone.id}>
                <p>Color: {phone.color}</p>
                <p>Fecha de Encuentro: {phone.date && phone.date.toDate().toLocaleDateString()}</p>
                <p>Información Adicional: {phone.information}</p>
                <p>Lugar de Encuentro: {phone.location}</p>
                <p>Mapa: {phone.map}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PhoneForm;

import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import firebaseConfig from '../../../firebase/firebaseConfig';
import 'react-datepicker/dist/react-datepicker.css';
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const DniSearch: React.FC = () => {
  const [names, setNames] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState<string>('');
  const [dniNumber, setDniNumber] = useState<string>('');
  const [dniData, setDniData] = useState<any[]>([]);

  useEffect(() => {
    const fetchNames = async () => {
      const dniCollection = collection(firestore, 'Dni');
      const dniSnapshot = await getDocs(dniCollection);
      const namesData = dniSnapshot.docs.map((doc) => doc.data().name);
      setNames(namesData);
    };
    fetchNames();
  }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedName(event.target.value);
  };

  const handleSearch = async () => {
    if (!dniNumber) {
      alert('Por favor ingresa el número de DNI');
      return;
    }

    const dniCollectionQuery = query(collection(firestore, 'Dni'), where('documentNumber', '==', dniNumber));
    const dniSnapshot = await getDocs(dniCollectionQuery);
    const data = dniSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setDniData(data);
  };

  return (
    <div>
      <div className="found-items-container">
        <h1>Buscar por Nombre y DNI</h1>
        <form>
          {/* Select para el nombre */}
          <div>
            <label htmlFor="name">Nombre:</label>
            <select
              id="name"
              value={selectedName}
              onChange={handleNameChange}
            >
              <option value="">Selecciona un nombre...</option>
              {names.map((name, index) => (
                <option key={index} value={name}>{name}</option>
              ))}
            </select>
          </div>
          {/* Input para el número de DNI */}
          <div>
            <label htmlFor="dni">Número de DNI:</label>
            <input
              type="text"
              id="dni"
              value={dniNumber}
              onChange={(e) => setDniNumber(e.target.value)}
              required
            />
          </div>
          {/* Botón para iniciar la búsqueda */}
          <button type="button" onClick={handleSearch}>Buscar</button>
        </form>
      </div>
      {/* Sección para mostrar resultados */}
      {dniData.length > 0 && (
        <div className="dni-search-results">
          <h2>Resultados para {selectedName || 'el número de DNI'}:</h2>
          <ul>
            {dniData.map((dni) => (
              <li key={dni.id}>
                <p>Nombre: {dni.name}</p>
                <p>Número de DNI: {dni.documentNumber}</p>
                <p>Fecha de Nacimiento: {dni.datebirth && dni.datebirth.toDate().toLocaleDateString()}</p>
                <p>Dirección: {dni.address}</p>
                <p>Mapa: {dni.map}</p>
                {/* Agrega aquí otros campos si es necesario */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DniSearch;

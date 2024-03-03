import React, { useState } from 'react';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import firebaseConfig from '../../../firebase/firebaseConfig';
import 'react-datepicker/dist/react-datepicker.css';
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const CashSearch: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [cashData, setCashData] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSearch = async () => {
    const cashCollectionQuery = query(collection(firestore, 'Cash'), where('amount', '==', amount));
    const cashSnapshot = await getDocs(cashCollectionQuery);
    const data = cashSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    if (data.length === 0) {
      setErrorMessage('No se encontraron datos para el monto ingresado.');
      setCashData([]);
    } else {
      setCashData(data);
      setErrorMessage('');
    }
  };

  return (
    <div>
      <h1>Búsqueda de Monto en Efectivo</h1>
      <div>
        <label htmlFor="amount">Monto:</label>
        <input
          type="text"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <button onClick={handleSearch}>Buscar</button>
      {cashData.length > 0 && (
        <div className="cash-search-results">
          <h2>Resultados para el monto {amount}:</h2>
          <ul>
            {cashData.map((cash) => (
              <li key={cash.id}>
                <p>Monto: {cash.amount}</p>
                <p>Fecha: {cash.date && cash.date.toDate().toLocaleDateString()}</p>
                <p>Ubicación: {cash.location}</p>
                <p>Monto de Ubicación: {cash.locationAmount}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CashSearch;

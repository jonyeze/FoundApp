import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import firebaseConfig from "../../../firebase/firebaseConfig";

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const CashForm: React.FC = () => {
  const [inputs, setInputs] = useState({
    amount: "",
    date: new Date(),
    locationAmount: "",
    location: "",
  });

  const handleInputChange = (key: string, value: string | Date | null) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [key]: value instanceof Date ? value : (value === null ? "" : value.toString()),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Datos ingresados:", inputs);
    
    try {
      const docRef = await addDoc(collection(firestore, 'Cash'), inputs);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setInputs({
      amount: "",
      date: new Date(),
      locationAmount: "",
      location: "",
    });
  };

  return (
    <div className="found-items-container">
      <h1>Ingresa los datos de Cash</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Monto:</label>
          <input
            type="number"
            id="amount"
            className="input-field"
            value={inputs.amount}
            onChange={(e) => handleInputChange("amount", e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Fecha:</label>
          <DatePicker
            id="date"
            selected={inputs.date}
            onChange={(date: Date | null) => handleInputChange("date", date)}
            required
          />
        </div>
        <div>
          <label htmlFor="locationAmount">Lugar De Encuentro:</label>
          <input
            type="text"
            id="locationAmount"
            value={inputs.locationAmount}
            onChange={(e) => handleInputChange("locationAmount", e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Mapa:</label>
          <input
            type="text"
            id="location"
            value={inputs.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CashForm;

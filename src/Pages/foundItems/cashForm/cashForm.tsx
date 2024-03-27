import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import firebaseConfig from "../../../firebase/firebaseConfig";
import { AuthContext } from "../../../context/authContext";

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

interface CashFormData {
  amount: string;
  date: Date;
  locationAmount: string;
  location: string;
}

const CashForm: React.FC = () => {
  const [inputs, setInputs] = useState<CashFormData>({
    amount: "",
    date: new Date(),
    locationAmount: "",
    location: "",
  });

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;

  const handleInputChange = (key: string, value: string | Date | null) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [key]:
        value instanceof Date ? value : value === null ? "" : value.toString(),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowConfirmation(true);
  };

  const handleSave = async () => {
    try {
      if (currentUser) {
        const dataWithUid = { ...inputs, uid: currentUser.uid };

        const docRef = await addDoc(
          collection(firestore, "Cash"),
          dataWithUid
        );

        console.log("Document written with ID: ", docRef.id);

        setInputs({
          amount: "",
          date: new Date(),
          locationAmount: "",
          location: "",
        });

        setShowConfirmation(false);
        setSuccessMessage("¡Los datos se guardaron correctamente!");
      } else {
        console.error("No se pudo obtener el usuario actual.");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleDelete = () => {
    setInputs({
      amount: "",
      date: new Date(),
      locationAmount: "",
      location: "",
    });
    setShowConfirmation(false);
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div className="found-items-container">
      {showConfirmation ? (
        <div className="submitted-data">
          <h2 className="data">Datos de Dinero a agregar</h2>
          <div className="data">
            <div className="label">Monto:</div>
            <div className="value">{inputs.amount}</div>
          </div>
          <div className="data">
            <div className="label">Fecha:</div>
            <div className="value">{inputs.date.toLocaleDateString()}</div>
          </div>
          <div className="data">
            <div className="label">Lugar De Encuentro:</div>
            <div className="value">{inputs.locationAmount}</div>
          </div>
          <div className="data">
            <div className="label">Mapa:</div>
            <div className="value">{inputs.location}</div>
          </div>
          <div className="data">
            <button onClick={handleDelete}>Eliminar datos</button>
            <button onClick={handleSave}>Guardar datos</button>
          </div>
        </div>
      ) : (
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
              onChange={(e) =>
                handleInputChange("locationAmount", e.target.value)
              }
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
          <button type="submit">Agregar</button>
        </form>
      )}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
};

export default CashForm;

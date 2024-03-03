import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import firebaseConfig from "../../../firebase/firebaseConfig";

// Inicializar Firebase con la configuración
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const DniForm: React.FC = () => {
  const [inputs, setInputs] = useState({
    address: "",
    datebirth: new Date(), // Establecer la fecha de nacimiento inicial como la fecha actual
    documentNumber: "",
    map: "",
    name: "",
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
      // Guardar los datos en Firestore
      const docRef = await addDoc(collection(firestore, 'Dni'), inputs);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    // Limpiar los inputs después de enviar los datos
    setInputs({
      name: "",
      address: "",
      datebirth: new Date(),
      documentNumber: "",
      map: "",
    });
  };

  return (
    <div className="found-items-container">
      <h1>Ingresa los datos de DNI</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={inputs.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Direccion:</label>
          <input
            type="text"
            id="address"
            value={inputs.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha De Nacimiento:</label>
          <DatePicker
            selected={inputs.datebirth}
            onChange={(date: Date | null) => handleInputChange("datebirth", date)}
            dateFormat="dd/MM/yyyy"
            required
          />
        </div>
        <div>
          <label htmlFor="documentNumber">Numero De Documento:</label>
          <input
            type="text"
            id="documentNumber"
            value={inputs.documentNumber}
            onChange={(e) =>
              handleInputChange("documentNumber", e.target.value)
            }
            required
          />
        </div>
        <div>
          <label htmlFor="location">Mapa:</label>
          <input
            type="text"
            id="location"
            value={inputs.map}
            onChange={(e) => handleInputChange("map", e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DniForm;

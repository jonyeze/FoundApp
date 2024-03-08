import React, { useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import firebaseConfig from "../../../firebase/firebaseConfig";
import "react-datepicker/dist/react-datepicker.css";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const ClothingSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [clothingData, setClothingData] = useState<any[]>([]);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario

    if (!searchTerm) {
      alert("Por favor ingresa una marca de ropa para buscar");
      return;
    }

    const clothingCollectionQuery = query(
      collection(firestore, "Clothing"),
      where("brand", "==", searchTerm)
    );
    const clothingSnapshot = await getDocs(clothingCollectionQuery);
    const data = clothingSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setClothingData(data);
  };

  return (
    <div>
      <div className="found-items-container">
        <h1>Buscar Ropa por Marca</h1>
        <form onSubmit={handleSearch}>
          <div>
            <label htmlFor="searchTerm">Marca de Ropa:</label>
            <input
              type="text"
              id="searchTerm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ingrese la marca de ropa"
              required
            />
          </div>

          <button type="submit">Buscar</button>
        </form>
      </div>
      {/* Sección para mostrar resultados */}
      {clothingData.length > 0 && (
        <div className="clothing-search-results">
          <h2>Resultados para {searchTerm}:</h2>
          <ul>
            {clothingData.map((clothing) => (
              <li key={clothing.id}>
                <p>Marca: {clothing.brand}</p>
                <p>Descripción: {clothing.description}</p>
                <p>
                  Fecha:{" "}
                  {new Date(clothing.date.seconds * 1000).toLocaleDateString()}
                </p>
                <p>Mapa: {clothing.map}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClothingSearch;

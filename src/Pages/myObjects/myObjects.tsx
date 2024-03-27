import React, { useContext, useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "./myObjects.css";
import { AuthContext } from "../../context/authContext";

const MyObjects: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext no está disponible");
  }

  const { currentUser } = authContext;
  const [userObjects, setUserObjects] = useState<any[]>([]);
  

  useEffect(() => {
    const getUserObjects = async () => {
      if (currentUser) {
        try {
          const collections = ["Dni", "Clothing", "Phone", "Cash"];
          let allUserObjects: any[] = [];

          for (const collectionName of collections) {
            const collectionRef = firebase
              .firestore()
              .collection(collectionName)
              .where("uid", "==", currentUser.uid);

            const snapshot = await collectionRef.get();
            const fetchedObjects = snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
              type: collectionName,
            }));
            allUserObjects = [...allUserObjects, ...fetchedObjects];
          }

          setUserObjects(allUserObjects);
        } catch (error) {
          console.error("Error al obtener objetos del usuario:", error);
        }
      }
    };

    getUserObjects();
  }, [currentUser]);

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const convertTimestampToDate = (timestamp: firebase.firestore.Timestamp) => {
    return timestamp.toDate();
  };

  return (
    <div className="container">
      <h2 className="title">Objetos del Usuario</h2>
      {userObjects.length === 0 ? (
        <p className="no-objects">No hay objetos asociados con este usuario.</p>
      ) : (
        <div className="object-container">
          {userObjects.map((object, index) => (
            <div key={index} className="object-card">
              <h3 className="object-type">{object.type}</h3>
              <ul className="object-list">
                {Object.entries(object)
                  .filter(([key]) => key !== "uid" && key !== "id" && key !== "type") // Filtrar las propiedades 'uid', 'id' y 'type'
                  .map(([key, value]) => (
                    <li key={key} className="object-item">
                      <div className="object-property">
                        <span className="object-key">{key}:</span>{" "}
                        <span className="object-value">
                          {value instanceof firebase.firestore.Timestamp
                            ? formatDate(convertTimestampToDate(value))
                            : JSON.stringify(value)}
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyObjects;

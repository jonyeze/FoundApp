import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from '../../../firebase/firebaseConfig';
import { AuthContext } from '../../../context/authContext';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

interface DniFormData {
  name: string;
  address: string;
  datebirth: Date;
  documentNumber: number | null;
  map: string;
}

const DniForm: React.FC = () => {
  const [inputs, setInputs] = useState<DniFormData>({
    address: '',
    datebirth: new Date(),
    documentNumber: null,
    map: '',
    name: '',
  });

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;

  const handleInputChange = (
    key: string,
    value: string | Date | number | null
  ) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [key]: value instanceof Date ? value : value === null ? null : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowConfirmation(true);
  };

  const handleSave = async () => {
    try {
      if (currentUser) {
        // Agregar el UID del usuario actual a los datos antes de guardarlos
        const dataWithUid = { ...inputs, uid: currentUser.uid };
        
        // Guardar los datos en la colección "Dni"
        const docRef = await addDoc(collection(firestore, 'Dni'), dataWithUid);
        
        console.log('Document written with ID: ', docRef.id);
        
        // Limpiar los campos después de guardar
        setInputs({
          address: '',
          datebirth: new Date(),
          documentNumber: null,
          map: '',
          name: '',
        });
        
        setShowConfirmation(false);
        setSuccessMessage('¡Los datos se guardaron correctamente!');
      } else {
        console.error('No se pudo obtener el usuario actual.');
      }
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleDelete = () => {
    setInputs({
      address: '',
      datebirth: new Date(),
      documentNumber: null,
      map: '',
      name: '',
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
          <h2 className="data">Documento a agregar</h2>
          <div className="data">
            <div className="label">Nombre:</div>
            <div className="value">{inputs.name}</div>
          </div>
          <div className="data">
            <div className="label">Numero de DNI:</div>
            <div className="value">{inputs.documentNumber}</div>
          </div>
          <div className="data">
            <div className="label">Direccion:</div>
            <div className="value">{inputs.address}</div>
          </div>
          <div className="data">
            <div className="label">Fecha de Nacimiento:</div>
            <div className="value">
              {inputs.datebirth.toLocaleDateString()}
            </div>
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
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={inputs.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="address">Direccion:</label>
            <input
              type="text"
              id="address"
              value={inputs.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              required
            />
          </div>
          <div>
            <label>Fecha De Nacimiento:</label>
            <DatePicker
              selected={inputs.datebirth}
              onChange={(date: Date | null) =>
                handleInputChange('datebirth', date)
              }
              dateFormat="dd/MM/yyyy"
              required
            />
          </div>
          <div>
            <label htmlFor="documentNumber">Numero De Documento:</label>
            <input
              type="number"
              id="documentNumber"
              className="input-field"
              value={
                inputs.documentNumber !== null
                  ? inputs.documentNumber.toString()
                  : ''
              }
              onChange={(e) =>
                handleInputChange(
                  'documentNumber',
                  e.target.value === '' ? null : parseInt(e.target.value)
                )
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

export default DniForm;

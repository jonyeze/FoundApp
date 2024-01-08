import React from "react";
import './DniOption.css';

interface DniOptionProps {
  inputValue: string;
  nameValue: string; // Agrega el valor del nombre
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Agrega la función de manejo del cambio del nombre
}

const DniOption: React.FC<DniOptionProps> = ({
  inputValue,
  nameValue,
  handleChange,
  handleNameChange,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Obtén el valor actual del input y elimina cualquier carácter que no sea un número
    let newValue = event.target.value.replace(/\D/g, "");

    // Limita la longitud a un mínimo de 7 y un máximo de 10 caracteres
    newValue = newValue.slice(0, 10);

    // Llama a la función handleChange con el nuevo valor
    handleChange({
      ...event,
      target: {
        ...event.target,
        value: newValue,
      },
    });
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="rounded-input-dni"
        placeholder="Ingrese el número de DNI"
      />
      <input
        type="text"
        value={nameValue}
        onChange={handleNameChange}
        className="rounded-input-dni"
        placeholder="Nombre y apellido"
      />
    </div>
  );
};

export default DniOption;

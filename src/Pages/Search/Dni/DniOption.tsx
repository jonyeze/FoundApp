import React from "react";
import DefaultInput from "../../../Components/DefaultInput/DefaultInput";
import "./DniOption.css";

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
  return (
    <div className="input-container">
      <DefaultInput
        inputValue={inputValue}
        handleChange={handleChange}
        idName={"dni_input"}
        placeholder={"Ingrese el número de DNI"}
        inputType={"number"}
      />

      <DefaultInput
        inputValue={nameValue}
        handleChange={handleNameChange}
        idName={"name_input"}
        placeholder={"Nombre y apellido"}
        inputType={"text"}
      />
    </div>
  );
};

export default DniOption;

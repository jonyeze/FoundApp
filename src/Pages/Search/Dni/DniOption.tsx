import React from "react";
import DefaultInput from "../../../components/DefaultInput/DefaultInput";
import "./DniOption.css";

interface DniOptionProps {
  inputValue: string;
  nameValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void; 
}

const DniOption: React.FC<DniOptionProps> = ({
  inputValue,
  nameValue,
  handleChange,
  handleNameChange,
}) => {
  return (
    <div className="container">
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
          placeholder={"Nombre completo"}
          inputType={"text"}
        />
      </div>
    </div>
  );
};

export default DniOption;

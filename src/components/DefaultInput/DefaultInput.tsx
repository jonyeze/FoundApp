import React from "react";
import { DefaultInputProps } from "./types";
import "./index.css";

const DefaultInput: React.FC<DefaultInputProps> = ({
  inputValue,
  idName,
  placeholder,
  handleChange,
  inputType,
}) => {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = inputValue;
      
        if (inputType === 'text') {
          newValue = event.target.value;
        } else if (inputType === 'number') {
          newValue = event.target.value.replace(/\D/g, "");
          newValue = newValue.slice(0, 10);
        } else if (inputType === 'password') {
          newValue = event.target.value;
        }
      
        handleChange({
          ...event,
          target: {
            ...event.target,
            value: newValue,
          },
        });
      };
      
    
  return (
    <input
      type={inputType}
      id={idName}
      value={inputValue}
      onChange={handleInputChange}
      placeholder={placeholder}
      className="default-input"
    />
  );
};

export default DefaultInput;

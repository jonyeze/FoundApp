import React from 'react';

interface OtherOptionProps {
  inputValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DNIOption: React.FC<OtherOptionProps> = ({ inputValue, handleChange }) => {
  return (
   
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="rounded-input"
        placeholder="Ingrese el número de DNI"
      />
      
  );
};

export default DNIOption;

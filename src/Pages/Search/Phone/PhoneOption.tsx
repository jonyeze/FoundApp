import React from 'react';
import './PhoneOption.css';

interface PhoneOptionProps {
  phoneValue: string;
  handlePhoneChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const PhoneOption: React.FC<PhoneOptionProps> = ({
   phoneValue, 
   handlePhoneChange 
  }) => {
    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      let newValue = event.target.value.toString();
      // Limita la longitud a un mínimo de 0 y un máximo de 200 caracteres
    newValue = newValue.slice(0, 200);

    handlePhoneChange({
      ...event,
      target: {
        ...event.target,
        value: newValue,
      },
    });
  };
  return (
      <textarea
        value={phoneValue}
        onChange={handleTextareaChange}
        className="rounded-input-phone"
        placeholder="Ingrese el número de DNI"
      />
    
  );
};

export default PhoneOption;

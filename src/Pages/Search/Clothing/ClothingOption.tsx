import React from 'react';
import './clothingOption.css';

interface ClothingOptionProps {
  clothingValue: string;
  handleClothingChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ClothingOption: React.FC<ClothingOptionProps> = ({ 
  clothingValue,
  handleClothingChange
 }) => {
  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newValue = event.target.value.toString();

    // Limita la longitud a un mínimo de 0 y un máximo de 200 caracteres
    newValue = newValue.slice(0, 200);

    handleClothingChange({
      ...event,
      target: {
        ...event.target,
        value: newValue,
      },
    });
  };
  return (
  
      <textarea     
        value={clothingValue}
        onChange={handleTextareaChange}
        className="rounded-input-clothing"
        placeholder="Describa que prenda extravio"
      />
    
  );
};

export default ClothingOption;

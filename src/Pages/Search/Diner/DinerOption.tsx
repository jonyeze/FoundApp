import React from 'react';
import DefaultTextarea from '../../../Components/DefaultTextarea/DefaultTextarea';

interface DinerOptionProps {
  dinerValue: string;
  handledinerChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const DinerOption: React.FC<DinerOptionProps> = ({ 
  dinerValue, 
  handledinerChange 
}) => {
  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newValue = event.target.value.toString();

    // Limita la longitud a un mínimo de 0 y un máximo de 200 caracteres
    newValue = newValue.slice(0, 200);

    handledinerChange({
      ...event,
      target: {
        ...event.target,
        value: newValue,
      },
    });
  };

  return (
    <DefaultTextarea
      value={dinerValue}
      handleChange={handleTextareaChange}
      placeholder="Describa cuanto dinero extravio y en que lugar"
    />
  );
};

export default DinerOption;

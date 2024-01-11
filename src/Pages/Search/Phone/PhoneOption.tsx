import React from "react";
import DefaultTextarea from "../../../Components/DefaultTextarea/DefaultTextarea";

interface PhoneOptionProps {
  phoneValue: string;
  handlePhoneChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const PhoneOption: React.FC<PhoneOptionProps> = ({
  phoneValue,
  handlePhoneChange,
}) => {
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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
    <DefaultTextarea
      value={phoneValue}
      handleChange={handleTextareaChange}
      placeholder="Ingrese el número de DNI"
    />
  );
};

export default PhoneOption;

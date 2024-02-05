import React from "react";
import DefaultInput from "../../../Components/DefaultInput/DefaultInput";

interface PhoneOptionProps {
  phoneValue: string;
  handlePhoneChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Corregido a HTMLInputElement
}

const PhoneOption: React.FC<PhoneOptionProps> = ({
  phoneValue,
  handlePhoneChange,
}) => {
  return (
    <div className="input-container">
      <DefaultInput
        inputValue={phoneValue}
        handleChange={handlePhoneChange}
        idName={"phone_input"}
        placeholder={"Descripción del teléfono"}
        inputType={"text"}
      />
    </div>
  );
};

export default PhoneOption;

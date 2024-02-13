import React from "react";
import DefaultInput from "../../../components/DefaultInput/DefaultInput";

interface OtherOptionProps {
  inputValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DNIOption: React.FC<OtherOptionProps> = ({
  inputValue,
  handleChange,
}) => {
  return (
    <DefaultInput
      inputValue={inputValue}
      handleChange={handleChange}
      placeholder={"Ingrese el número de DNI"}
      inputType={"number"}
    />
  );
};

export default DNIOption;

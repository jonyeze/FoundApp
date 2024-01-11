import React from "react";
import DefaultTextarea from "../../../Components/DefaultTextarea/DefaultTextarea";

interface ClothingOptionProps {
  clothingValue: string;
  handleClothingChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ClothingOption: React.FC<ClothingOptionProps> = ({
  clothingValue,
  handleClothingChange,
}) => {
  return (
    <DefaultTextarea
      value={clothingValue}
      handleChange={handleClothingChange}
      placeholder={"Describa que prenda extravio"}
    />
  );
};

export default ClothingOption;

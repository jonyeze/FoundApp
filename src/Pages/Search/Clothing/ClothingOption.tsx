import React from "react";
import DefaultTextarea from "../../../components/DefaultTextarea/DefaultTextarea";

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
      placeholder={"Tipo de prenda"}
    />
  );
};

export default ClothingOption;

import React from "react";
import { dropdownOptions, DropdownProps } from "./types";
import "../../Pages/Search/Search.css";


const Dropdown: React.FC<DropdownProps> = ({ selectedOption, onChange }) => {
  return (
    <select
      value={selectedOption}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-input"
    >
      {dropdownOptions.map((option, index) => (
        <option key={index} value={option.value} id={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;



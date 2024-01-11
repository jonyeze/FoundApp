export interface DropdownProps {
  selectedOption: string;
  onChange: (selectedOption: string) => void;
}

export interface DropdownOption {
  value: string;
  label: string;
  id: string;
}

export const dropdownOptions: DropdownOption[] = [
  { value:"dni", label:"DNI", id:"dni_option" },
  { value:"cash", label:"Dinero", id:"cash_option" },
  { value:"clothing", label:"Ropa", id:"clothing_option" },
  { value:"phone", label:"Celular", id:"phone_option" },
];
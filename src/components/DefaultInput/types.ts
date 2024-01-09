export interface DefaultInputProps {
  inputValue: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    idName?: string;
    inputType: "text" | "number";}

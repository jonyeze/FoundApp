import React from "react";
import { DefaultTextareaProps } from "./types";
import "./index.css";

const DefaultTextarea: React.FC<DefaultTextareaProps> = ({
  value,
  idName,
  placeholder,
  handleChange,
}) => {
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let newValue = event.target.value.toString();

    newValue = newValue.slice(0, 200);

    handleChange({
      ...event,
      target: {
        ...event.target,
        value: newValue,
      },
    });
  };
  return (
    <textarea
      id={idName}
      value={value}
      onChange={handleTextareaChange}
      placeholder={placeholder}
      className="rounded-textarea"
    />
  );
};

export default DefaultTextarea;

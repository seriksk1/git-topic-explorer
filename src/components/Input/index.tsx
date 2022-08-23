import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  setValue: (value: string) => void;
}

export const Input: React.FC<Props> = ({ setValue, ...props }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <input className="custom-input" onChange={handleChange} {...props} />;
};

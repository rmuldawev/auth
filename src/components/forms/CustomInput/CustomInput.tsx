import React, { FC } from "react";
import { Controller, FieldError } from "react-hook-form";
import "../CustomInput/styles.css";

interface CustomInputProps {
  name: string;
  placeholder: string;
  title: string;
  error?: FieldError;
}

const CustomInput: FC<CustomInputProps> = ({
  name,
  placeholder,
  title,
  error,
}) => {
  return (
    <Controller
      defaultValue={""}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <div className="inputContainer">
            <p className="titleText">{title}</p>
            <input
              autoCorrect="false"
              className={value ? "focusInput" : "stateInput"}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
            {error && <p className="error">{error.message}</p>}
          </div>
        );
      }}
    />
  );
};

export default CustomInput;

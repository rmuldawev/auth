import React, { FC } from "react";
import "../CustomButton/styles.css";

interface CustomButtonProps {
  title: string;
  onClick: () => void;
  isValid: boolean;
}

const CustomButton: FC<CustomButtonProps> = ({ title, onClick, isValid }) => {
  return (
    <button
      type="submit"
      className={isValid ? "customButton" : "disabledButton"}
      onClick={onClick}
    >
      <p className="buttonText">{title}</p>
    </button>
  );
};

export default CustomButton;

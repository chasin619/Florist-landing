import React from "react";

interface ButtonProps {
  title: string;
  customStyles?: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  onClick?: () => void;
  props?: any;
}

const Button: React.FC<ButtonProps> = ({ title, customStyles, disabled = false, ...props }) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`bg-primary hover:bg-white hover:text-primary hover:border border-primary text-white py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 ${disabled && "opacity-70"} ${customStyles}`}
    >
      {title}
    </button>
  );
};

export default Button;

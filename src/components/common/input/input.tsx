import React, { forwardRef } from "react";

type InputProps = {
  placeholder?: string;
  name?: string;
  error?: Record<string, { message: string }> | any;
  autoFocus?: boolean;
  styles?: string;
  type?: "text" | "password" | "email" | "number";
  disabled?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'>;

const Input = forwardRef<HTMLInputElement, InputProps>(({
  placeholder,
  name,
  error = {},
  autoFocus = false,
  styles = "",
  type = "text",
  disabled = false,
  required = false,
  onChange,
  value,
  ...props
}, ref) => {
  const errorMsg = name ? error[name]?.message : undefined;

  return (
    <div className="w-full">
      <input
        ref={ref}
        {...props}
        type={type}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        required={required}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        className={`
          bg-transparent 
          border-2 
          rounded-lg 
          p-2 
          w-full 
          text-primaryGray 
          outline-none 
          transition-colors
          duration-200
          disabled:opacity-50
          disabled:cursor-not-allowed
          ${errorMsg ? "border-red-500 focus:border-red-600" : "focus:border-primary"}
          ${styles}
        `.trim()}
      />
      {errorMsg && (
        <p className="mt-1 text-sm font-medium text-red-500">{errorMsg}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;

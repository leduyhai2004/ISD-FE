"use client";

/**
 * Reusable input field component with validation
 */
import { useState } from "react";

/**
 * Input field component with validation
 * @param {Object} props - Component props
 * @returns {JSX.Element} Input field component
 */
const InputField = ({
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  label,
  error,
  required = false,
  className = "",
  ...props
}) => {
  const [touched, setTouched] = useState(false);

  const handleBlur = (e) => {
    setTouched(true);
    if (onBlur) onBlur(e);
  };

  const showError = touched && error;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={name}>
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`form-control ${showError ? "is-invalid" : ""}`}
        {...props}
      />
      {showError && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default InputField;

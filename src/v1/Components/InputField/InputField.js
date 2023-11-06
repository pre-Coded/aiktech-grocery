import React from "react";
import "./InputField.scss";

function InputField({
  placeholder,
  type,
  onChange,
  value,
  disabled,
  error = "",
  label,
  name,
  id,
  autofocus,
  max,
  cn,
}) {
  return (
    <div className="input-container">
      {label && <div className="input-label">{label}</div>}
      <input
        style={{ padding: "15px" }}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={disabled}
        name={name}
        id={id}
        autoFocus={autofocus}
        max={max}
        className={cn}
      />
      {error && <div className="err-div">{error}</div>}
    </div>
  );
}

export default InputField;

import React from "react";

const Input = ({name, label, type, value, onChange, error, focus,}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        className="form-control"
        onChange={onChange}
        autoFocus={focus}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;

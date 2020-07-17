import React from "react";
import "./styles.css";

const Button = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`button ${className}`} type="button">
    {children}
  </button>
);

export default Button;

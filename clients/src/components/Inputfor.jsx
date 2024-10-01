"use client";

import React from "react";

export const Inputfor = ({
  value,
  name,
  type,
  className,
  bg,
  onChange,
  placeholder,
}) => {
  return (
    <input
      name={name}
      onChange={onChange}
      value={value}
      type={type}
      placeholder={placeholder}
      className={`input focus:outline-none ${bg} input-bordered ${className}`}
    />
  );
};

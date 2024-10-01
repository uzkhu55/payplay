"use client";

import React from "react";

export const Button = ({
  bg,
  tcolor,
  onClick,
  rounded,
  text,
  hover,
  width,
  height,
  className,
  loading,
}) => {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className={`btn	${className} btn-active ${rounded} ${hover} ${width} ${tcolor} ${height} ${bg}`}
    >
      {text}
    </button>
  );
};

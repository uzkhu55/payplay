"use client";

const Select = ({ text, width, height, bg, color, text1, onChange }) => {
  return (
    <select
      onChange={onChange}
      className={`select ${width} ${bg} ${color} ${height} focus:outline-none select-bordered w-full`}
    >
      <option defaultValue value={text}>
        {text}
      </option>
      <option value={text1}>{text1}</option>
    </select>
  );
};

export default Select;

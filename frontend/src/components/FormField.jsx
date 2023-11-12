import React from "react";

const FormField = ({
  label,
  name,
  type,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 my-2">
        <label htmlFor={name} className="text-sm text-gray-900">
          {label}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#dbdbdb] p-2 rounded-[5px] text-black"
          >
            Sample promts
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[green] focus:border-[green] outline:none block w-full p-3"
      ></input>
    </div>
  );
};

export default FormField;

import React, { useState } from "react";

const MultiSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  className,
  isRequired,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const selectedOptions = options?.filter((opt) => value?.includes(opt.value));

  return (
    <div className={`mb-4 w-full ${className}`}>
      <label className="block text-gray-700 mb-1">
        {label}
        {isRequired && (
          <span className="text-red-600 mx-0.5 select-none">*</span>
        )}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-left flex flex-wrap gap-2 items-center justify-between hover:border-gray-400"
          {...rest}
        >
          <div className="flex flex-wrap gap-2">
            {selectedOptions?.length > 0 ? (
              selectedOptions.map((opt) => (
                <span
                  key={opt.value}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-1"
                >
                  {opt.label}
                  <span
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChange(opt.value);
                    }}
                    className="text-blue-600 hover:text-blue-800 font-bold"
                  >
                    ×
                  </span>
                </span>
              ))
            ) : (
              <span className="text-gray-500">
                {placeholder || "Select options"}
              </span>
            )}
          </div>
          <span>{isOpen ? "▲" : "▼"}</span>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
            {options?.map((option) => (
              <label
                key={option.value}
                className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={option.value}
                  checked={value?.includes(option.value)}
                  onChange={() => handleChange(option.value)}
                  className="mr-2"
                />
                {option.label}
              </label>
            ))}
          </div>
        )}
      </div>

      {error && (
        <span className="text-red-600 text-xs" id={`${label}-error`}>
          {error}
        </span>
      )}
    </div>
  );
};

export default MultiSelect;

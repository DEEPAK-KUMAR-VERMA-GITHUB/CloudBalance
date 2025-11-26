const InputSelect = ({
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
  return (
    <div className={`mb-4 w-full ${className}`}>
      <label className="block text-gray-700 mb-1" htmlFor={label}>
        {label}
        {isRequired && (
          <span className="text-red-600 mx-0.5 select-none">*</span>
        )}
      </label>

      <select
        id={label}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${label}-error` : undefined}
        {...rest}
      >
        <option value="" disabled>
          {placeholder || "Select an option"}
        </option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <span id={`${label}-error`} className="text-red-600 text-xs">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputSelect;

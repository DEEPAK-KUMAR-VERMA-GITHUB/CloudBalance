
const InputField = ({ label, type="text", value, onChange, placeholder, error, className, ...rest }) => {
  return (
    <div className={`mb-4 w-full ${className} `} >
        <label className='block text-gray-700 mb-1' htmlFor={label}>
            {label}
        </label>

        <input
            id={label}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!error}
            aria-describedby={error ? `${label}-error` : undefined}
            {...rest}
        />
        {
            error && (
                <span id={`${label}-error`} className='text-red-600 text-xs'>
                    {error}
                </span>
            )
        }

    </div>
  )
}

export default InputField
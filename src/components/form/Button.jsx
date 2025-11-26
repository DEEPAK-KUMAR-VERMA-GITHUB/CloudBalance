const Button = ({ type="button", label, isLoading, className, ...rest }) => (
    <button
        type={type}
        className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${className}`}
        disabled={isLoading}
        {...rest}
    >
        {isLoading ? 'Loading...' : label}
    </button>
)

export default Button;
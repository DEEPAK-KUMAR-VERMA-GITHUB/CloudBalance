const ErrorMessage = ({ message }) => (
    message ? <div className="mb-4 text-red-600 text-sm" >{message}</div> : null
)

export default ErrorMessage;
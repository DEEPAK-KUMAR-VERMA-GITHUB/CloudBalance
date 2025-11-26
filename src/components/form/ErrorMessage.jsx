const ErrorMessage = ({ message }) => (
    message ? <div className="mb-4 text-red-600 text-sm text-center" >{message}</div> : null
)

export default ErrorMessage;
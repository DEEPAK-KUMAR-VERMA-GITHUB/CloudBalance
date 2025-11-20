const FormContainer = ({ label, children, className }) => (
  <div className={`max-w-lg rounded-lg shadow-lg bg-white p-8 flex flex-col align-center items-center ${className}`}>
    <div className="mb-4 text-center font-bold text-lg text-shadow-gray-700">
      {label}
    </div>
    {children}
  </div>
);
export default FormContainer;

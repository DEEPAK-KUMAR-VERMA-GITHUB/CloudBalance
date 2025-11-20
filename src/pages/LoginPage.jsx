import { useState } from "react";
import FormContainer from "../components/form/FormContainer";
import CloudkeeperLogo from "./../assets/cloudkeeper-logo.png";
import InputField from "../components/form/InputField";
import ErrorMessage from "../components/form/ErrorMessage";
import Button from "../components/form/Button";
import {
  sanitizeInput,
  validateEmail,
  validatePassword,
} from "../utils/validation";
import toast from "react-hot-toast";
import { login } from "../apis/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (setter, key) => (e) => {
    const sanitized = sanitizeInput(e.target.value);
    setter(sanitized);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]:
        key === "email"
          ? !validateEmail(sanitized)
            ? "Invalid email address"
            : ""
          : !validatePassword(sanitized)
          ? "Password must be at least 8 characters long, contain an uppercase letter and a number"
          : "",
    }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    const currentErrors = {
      email: !validateEmail(email) ? "Invalid email address." : "",
      password: !validatePassword(password)
        ? "Password must be strong (min 8 chars, uppercase, number)."
        : "",
    };
    setErrors(currentErrors);

    if (Object.values(currentErrors).some(Boolean)) return;

    setLoading(true);

    try {
      await login(email, password);
      toast.success("Login successful!");
      // Redirect or perform further actions upon successful login
    } catch (err) {
      console.error(err);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: "Something went wrong during login.",
      }));
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form autoComplete="off" className="w-lg" onSubmit={handelSubmit}>
        <FormContainer
          label={
            <img
              src={CloudkeeperLogo}
              alt="Cloudkeeper Logo"
              className="w-80 h-40"
            />
          }
        >
          <InputField
            label="Email"
            value={email}
            onChange={handleInputChange(setEmail, "email")}
            error={errors.email}
            type="email"
            inputMode="email"
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={handleInputChange(setPassword, "password")}
            error={errors.password}
          />
          <ErrorMessage
            message={
              errors.length > 0 ? errors[0].email || errors[0].general : ""
            }
          />
          <Button
            className="cursor-pointer"
            type="submit"
            isLoading={loading}
            label={loading ? "Logging in..." : "Login"}
          />
        </FormContainer>
      </form>
    </div>
  );
};

export default LoginPage;

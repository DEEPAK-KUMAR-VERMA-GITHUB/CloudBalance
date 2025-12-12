import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../components/form/Button";
import ErrorMessage from "../components/form/ErrorMessage";
import FormContainer from "../components/form/FormContainer";
import InputField from "../components/form/InputField";
import Footer from "../components/layout/Footer";
import { useAuth } from "../contexts/AuthContext";
import {
  sanitizeInput,
  validateEmail,
  validatePassword,
} from "../utils/validation";
import CloudkeeperLogo from "./../assets/images/cloudkeeper-logo.png";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);
  // const { login } = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      // await login(email, password);
      await dispatch(login(email, password))
      toast.success("Login successful!");
      navigate("/dashboard");
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

      <Footer leftText={"Have Questions ? Talk to our Team"} rightText={`CloudKeeper ${new Date().getFullYear()} | All Rights Reserved `} />
    </div>
  );
};

export default LoginPage;

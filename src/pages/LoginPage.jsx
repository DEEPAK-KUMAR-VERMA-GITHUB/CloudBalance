import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/form/Button";
import ErrorMessage from "../components/form/ErrorMessage";
import FormContainer from "../components/form/FormContainer";
import InputField from "../components/form/InputField";
import Footer from "../components/layout/Footer";
import { login } from "../redux/actions";
import {
  sanitizeInput,
  validateEmail,
  validatePassword,
} from "../utils/validation";
import CloudkeeperLogo from "./../assets/images/cloudkeeper-logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentErrors = {
      email: !validateEmail(email) ? "Invalid email address." : "",
      password: !validatePassword(password)
        ? "Password must be strong (min 8 chars, uppercase, number)."
        : "",
    };
    setErrors(currentErrors);

    if (Object.values(currentErrors).some(Boolean)) return;
    try {
      // Add await to properly handle the async thunk
      await dispatch(login(email, password));
      // Navigation happens in useEffect when isAuthenticated becomes true
    } catch (error) {
      // Error is already handled in Redux action and stored in state.auth.error
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <form autoComplete="off" className="w-lg" onSubmit={handleSubmit}>
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
          <ErrorMessage message={error || errors.general} />
          <Button
            className="cursor-pointer"
            type="submit"
            isLoading={loading}
            label={loading ? "Logging in..." : "Login"}
          />
        </FormContainer>
      </form>

      <Footer
        className={"absolute bottom-0 -left-49 w-full"}
        leftText={"Have Questions ? Talk to our Team"}
        rightText={`CloudKeeper ${new Date().getFullYear()} | All Rights Reserved `}
      />
    </div>
  );
};

export default LoginPage;

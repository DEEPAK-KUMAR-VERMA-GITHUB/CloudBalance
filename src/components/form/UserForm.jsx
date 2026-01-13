import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserRoles } from "../../apis/usersData";
import { addUser, updateUser } from "../../redux/actions";
import { validateEmail } from "../../utils/validation";
import {
  Button,
  ErrorMessage,
  FormContainer,
  InputField,
  InputSelect,
} from "../form";

const defaultForm = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
};

function validateAddUserForm(formData) {
  console.log(formData);
  const errors = {};
  if (!formData.firstName.trim()) errors.firstName = "First name is required.";
  if (!formData.lastName.trim()) errors.lastName = "Last name is required.";
  if (!formData.email.trim() || !validateEmail(formData.email))
    errors.email = "Valid email is required.";
  if (!formData.role.trim()) errors.role = "Valid role is required.";
  return errors;
}

const UserForm = ({ user, isEdit = false }) => {
  const [form, setForm] = useState(
    isEdit
      ? {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        }
      : defaultForm
  );
  const [errors, setErrors] = useState({});

  const { loading } = useSelector((state) => state.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && isEdit) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      });
    } else {
      setForm(defaultForm);
    }
    setErrors({});
  }, [user, isEdit]);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validation = validateAddUserForm(form);

    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    try {
      if (isEdit) {
        // await apiUpdateUser(user.id, form);
        await dispatch(updateUser(user.id, form));
        await toast.success("User updated successfully!");
      } else {
        // await apiAddUser(form);
        await dispatch(addUser(form));
        toast.success("User added successfully!");
      }
      navigate("/user-management");
    } catch (error) {
      const errorMsg = error?.message || "Operation failed. Please try again.";
      setErrors({ general: errorMsg });
      toast.error(errorMsg);
    }
  }
  return (
    <>
      {errors.general && <ErrorMessage message={errors.general} />}

      <FormContainer className="min-w-full">
        <form className="w-full">
          <div className="flex gap-5 w-full ">
            <InputField
              label={"First Name"}
              placeholder={"Enter First Name"}
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              error={errors.firstName}
              isRequired
            />
            <InputField
              label={"Last Name"}
              placeholder={"Enter Last Name"}
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              error={errors.lastName}
              isRequired
            />
          </div>
          <div className="flex gap-5 w-full">
            <InputField
              type="email"
              label={"Email ID"}
              placeholder={"Enter Email ID"}
              inputMode="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
              isRequired
            />
            <InputSelect
              label={"Select Role"}
              options={Object.values(UserRoles)}
              value={form.role}
              onChange={(e) => handleChange("role", e.target.value)}
              error={errors.role}
              isRequired
            />
          </div>

          <Button
            type="submit"
            label={isEdit ? "Update User" : "Add User"}
            isLoading={loading}
            onClick={handleSubmit}
          />
        </form>
      </FormContainer>
    </>
  );
};

export default UserForm;

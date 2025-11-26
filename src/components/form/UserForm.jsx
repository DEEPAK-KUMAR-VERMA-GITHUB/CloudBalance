import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Button,
  ErrorMessage,
  FormContainer,
  InputField,
  MultiSelect,
} from "../form";
import { UserRoles } from "../../apis/usersData";
import { validateEmail } from "../../utils/validation";
import { apiAddUser, apiUpdateUser } from "../../apis/services/userServices";

const roleOptions = Object.values(UserRoles).map((role) => ({
  label: role,
  value: role,
}));

const defaultForm = {
  firstName: "",
  lastName: "",
  email: "",
  roles: [],
};

function validateAddUserForm(formData) {
  const errors = {};
  if (!formData.firstName.trim()) errors.firstName = "First name is required.";
  if (!formData.lastName.trim()) errors.lastName = "Last name is required.";
  if (!formData.email.trim() || !validateEmail(formData.email))
    errors.email = "Valid email is required.";
  if (!formData.roles.length) errors.roles = "Select at least one role.";
  return errors;
}

const UserForm = ({ user, isEdit = false }) => {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && isEdit) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: user.roles,
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

    setSubmitting(true);

    try {
      if (isEdit) {
        await apiUpdateUser(user.id, form);
        toast.success("User updated successfully!");
        navigate("/user-management");
        return;
      }
      await apiAddUser(form);
      toast.success("User added successfully!");
      navigate("/user-management");
    } catch (error) {
      setErrors({ general: error.message || "Failed to add user." });
    } finally {
      setSubmitting(false);
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
            <MultiSelect
              label="Select Roles"
              options={roleOptions}
              value={form.roles}
              onChange={(value) => handleChange("roles", value)}
              error={errors.roles}
              isRequired
            />
          </div>

          <Button
            type="submit"
            label={isEdit ? "Update User" : "Add User"}
            isLoading={submitting}
            onClick={handleSubmit}
          />
        </form>
      </FormContainer>
    </>
  );
};

export default UserForm;

import React from "react";
import Divider from "../components/Divider";
import FormContainer from "../components/form/FormContainer";
import InputField from "../components/form/InputField";
import Button from "../components/form/Button";
import InputSelect from "../components/form/InputSelect";
import { UserRoles } from "../apis/usersData";
import MultiSelect from "../components/form/MultiSelect";

const AddNewUser = () => {
  const handleAddUser = () => {};

  return (
    <div>
      <h1 className=" text-2xl font-semibold my-1 ">Add User</h1>
      <Divider />

      <FormContainer className="min-w-full items-start ">
        <div className="flex gap-5 w-full ">
          <InputField
            label={"First Name"}
            placeholder={"Enter First Name"}
            isRequired={"true"}
          />
          <InputField
            label={"Last Name"}
            placeholder={"Enter Last Name"}
            isRequired={"true"}
          />
        </div>
        <div className="flex gap-5 w-full">
          <InputField
            label={"Email ID"}
            placeholder={"Enter Email ID"}
            isRequired={"true"}
          />
          <MultiSelect
            label="Select Roles"
            options={Object.values(UserRoles).map((role) => ({
              label: role,
              value: role,
            }))}
            isRequired={"true"}
          />
        </div>

        <Button label={"Add User"} onClick={handleAddUser} />
      </FormContainer>
    </div>
  );
};

export default AddNewUser;

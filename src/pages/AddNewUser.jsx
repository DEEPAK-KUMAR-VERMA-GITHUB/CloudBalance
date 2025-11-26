import Divider from "../components/Divider";
import UserForm from "../components/form/UserForm";

const AddNewUser = () => {
  return (
    <div>
      <h1 className=" text-2xl font-semibold my-1 ">Add User</h1>
      <Divider />
      <UserForm />
    </div>
  );
};

export default AddNewUser;

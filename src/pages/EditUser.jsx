import { Navigate, useLocation, useParams } from "react-router-dom";
import Divider from "../components/Divider";
import UserForm from "../components/form/UserForm";

const EditUser = () => {
  const id = useParams();
  const { state } = useLocation();

  if(!id || !state) return <Navigate to="/user-management" />;

  return (
    <div>
      <h1 className=" text-2xl font-semibold my-1 ">Edit User</h1>
      <Divider />
      <UserForm key={id} user={state} isEdit />
    </div>
  );
};

export default EditUser;

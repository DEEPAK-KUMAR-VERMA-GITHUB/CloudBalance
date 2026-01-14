import { Navigate, useLocation, useParams } from "react-router-dom";
import Divider from "../components/Divider";
import UserForm from "../components/form/UserForm";
import AccountTransfer from "../components/assign-account/AccountTransfer";
import { UserRoles } from "../apis/usersData";

const EditUser = () => {
  const { id } = useParams();
  const { state } = useLocation();

  if (!id || !state) return <Navigate to="/user-management" />;

  return (
    <div>
      <h1 className=" text-2xl font-semibold my-1 ">Edit User</h1>
      <Divider />
      <UserForm key={id} user={state} isEdit />
      {state.role === UserRoles.CUSTOMER && <AccountTransfer userId={id} />}
    </div>
  );
};

export default EditUser;

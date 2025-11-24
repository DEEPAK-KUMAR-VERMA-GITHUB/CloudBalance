import { Info, Pencil } from "lucide-react";
import { populateUsers } from "../apis/usersData";
import Table from "../components/table/Table";
import Switch from "../components/Switch";
import { useId, useState } from "react";

const userColumns = [
  { key: "firstName", label: "First Name", sortable: true, filterable: true },
  { key: "lastName", label: "Last Name", sortable: true, filterable: true },
  { key: "email", label: "Email", sortable: true, filterable: true },
  {
    key: "roles",
    label: "Roles",
    sortable: false,
    filterable: true,
    render: (roles) => (
      <div className="flex gap-1">
        {roles.map((r, idx) => (
          <span
            key={r || idx}
            className="bg-blue-100 text-blue-700 rounded px-2 py-0.5 text-xs mx-0.5"
          >
            {r}
          </span>
        ))}
      </div>
    ),
  },
  { key: "lastLogin", label: "Last Login", sortable: true, filterable: true },
  {
    key: "actions",
    label: "Actions",
    sortable: false,
    filterable: false,
    render: (_, row) => (
      <div className="flex gap-6 items-center">
        <Switch key={row} />
        <Pencil size={20} color="blue" />

        <button className="bg-blue-600 text-white rounded px-2 py-0.5 text-xs">
          Promote
        </button>
        <button className="bg-gray-200 text-gray-800 rounded px-2 py-0.5 text-xs border border-gray-300">
          Resend Link
        </button>
      </div>
    ),
  },
];
const UserManagement = () => {
  const userData = populateUsers();
  const [twoFactorAuthEnable, setTwoFactorAuthEnable] = useState(false);

  const switchKey = useId();

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className=" text-2xl font-semibold my-1 ">Users</h1>
        <div className="flex items-center gap-1">
          <p className="flex items-center gap-1 text-gray-600">
            Two-factor Authentication{" "}
            <span className="">
              <Info size={15} color="blue" />{" "}
            </span>{" "}
          </p>
          <Switch
            key={switchKey}
            checked={twoFactorAuthEnable}
            onChange={() => setTwoFactorAuthEnable((prev) => !prev)}
          />
        </div>
      </header>

      <Table columns={userColumns} data={userData} pageSize={10} />
    </>
  );
};

export default UserManagement;

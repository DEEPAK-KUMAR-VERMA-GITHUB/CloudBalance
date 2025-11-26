import { Info, Pencil } from "lucide-react";
import { useEffect, useId, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGetUsers } from "../apis/services/userServices";
import { Divider, Loader, Switch } from "../components";
import { Button } from "../components/form";
import { Table } from "../components/table";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [twoFactorAuthEnable, setTwoFactorAuthEnable] = useState(false);

  const switchKey = useId();
  const navigate = useNavigate();

  const handleAddUserClick = () => {
    navigate("add-user");
  };

  useEffect(() => {
    let isMounted = true;

    setLoading(true);

    apiGetUsers()
      .then((data) => {
        if (isMounted) {
          setUsers(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const columns = useMemo(
    () => [
      {
        key: "firstName",
        label: "First Name",
        sortable: true,
        filterable: true,
      },
      { key: "lastName", label: "Last Name", sortable: true, filterable: true },
      { key: "email", label: "Email", sortable: true, filterable: true },
      {
        key: "roles",
        label: "Roles",
        sortable: false,
        filterable: true,
        render: (roles) => (
          <div className="flex gap-1">
            {roles.map((role, idx) => (
              <span
                key={role || idx}
                className="bg-blue-100 text-blue-700 rounded px-2 py-0.5 text-xs mx-0.5"
              >
                {role}
              </span>
            ))}
          </div>
        ),
      },
      {
        key: "lastLogin",
        label: "Last Login",
        sortable: true,
        filterable: true,
      },
      {
        key: "action",
        label: "Action",
        sortable: false,
        filterable: false,
        render: (_, row) => (
          <div className="flex items-center gap-2 min-w-[260px]">
            <Switch key={`switch-${row.id}`} />
            <Pencil
              size={20}
              onClick={() => navigate(`edit-user/${row.id}`, { state: row })}
              className="cursor-pointer text-blue-300 hover:text-blue-700 transition"
            />
            {row.canPromote ? (
              <button className="cursor-pointer bg-blue-400 hover:bg-blue-600 text-white rounded px-2 py-0.5 text-xs w-16">
                Promote
              </button>
            ) : (
              <span className="w-16 inline-block" aria-hidden="true" />
            )}
            {row.canResend ? (
              <button className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 rounded px-2 py-0.5 text-xs border border-gray-300 w-16">
                Resend
              </button>
            ) : (
              <span className="w-16 inline-block" aria-hidden="true" />
            )}
          </div>
        ),
      },
    ],
    [navigate]
  );

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold my-1">Users</h1>
        <div className="flex items-center gap-1">
          <p className="flex items-center gap-1 text-gray-600">
            Two-factor Authentication
            <span>
              <Info size={15} color="blue" />
            </span>
          </p>
          <Switch
            key={switchKey}
            checked={twoFactorAuthEnable}
            onChange={() => setTwoFactorAuthEnable((prev) => !prev)}
          />
        </div>
      </header>
      <Divider />

      <Button
        label={"+ Add New User"}
        className={"max-w-fit cursor-pointer my-2"}
        onClick={handleAddUserClick}
      />

      {loading ? (
        <Loader />
      ) : (
        <Table columns={columns} data={users} pageSize={10} />
      )}
    </>
  );
};

export default UserManagement;

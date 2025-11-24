import React from "react";

const RoleBadge = ({ role }) => {
  return (
    <span
      className={`inline-block px-2 py-0.5 mx-0.5 rounded-full text-xs font-medium bg-blue-400`}
    >
      {role}
    </span>
  );
};

export default RoleBadge;

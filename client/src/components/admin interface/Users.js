import React from "react";
import { useSelector } from "react-redux";
import User from "./User";

function Users() {
  const users = useSelector((state) => state.authReducer.users);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {users && users[0] && users.map((e, i) => <User key={i} e={e} />)}
    </div>
  );
}

export default Users;

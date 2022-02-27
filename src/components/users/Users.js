import React from "react";
import UsersList from "./UsersList";
import Input from "../input/Input";
import Div from "../div/Div";
import p from "./Users.module.css";

function Users({
  users,
  userToDisplayPost,
  setUserToDisplayPost,
  value,
  setSearchName,
}) {
  return (
    <Div className={p.users}>
      <Input
        value={value}
        onChange={({ target }) => setSearchName(target.value)}
        placeholder="Search Users"
      />

      <UsersList
        users={users}
        userToDisplayPost={userToDisplayPost}
        setUserToDisplayPost={setUserToDisplayPost}
      />
    </Div>
  );
}

export default Users;

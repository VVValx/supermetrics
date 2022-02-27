import React from "react";
import p from "./Users.module.css";

function UsersList({ users, userToDisplayPost, setUserToDisplayPost }) {
  return users.map((user) => (
    <div
      className={`${p.userWrapper} ${
        user.id === userToDisplayPost && "active"
      }`}
      key={user.id}
      onClick={() => setUserToDisplayPost(user.id)}
    >
      <div className={p.user}>{user.name}</div>
      <div className={p.count}>{user.posts.length}</div>
    </div>
  ));
}

export default UsersList;

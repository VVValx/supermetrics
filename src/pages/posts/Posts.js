import React, { useState, useEffect } from "react";
import useGetToken from "../../customHooks/useGetToken";
import post from "./Posts.module.css";

function Posts() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const token = useGetToken();
  console.log("token", token);
  //   useEffect(() => {
  //     getUsers();
  //   }, []);

  //   const getUsers = () => {
  //     const users = [];
  //     let page = 1;
  //     while (page <= 10) {
  //       //logic
  //     }
  //   };
  return <p>Posts</p>;
}

export default Posts;

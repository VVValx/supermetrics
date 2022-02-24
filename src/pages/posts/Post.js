import React from "react";
import { useParams } from "react-router-dom";
import post from "./Posts.module.css";

function Post() {
  console.log("param", useParams());
  return <p>A user post </p>;
}

export default Post;

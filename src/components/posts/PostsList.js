import React from "react";
import formatDate from "../../utils/formatDate";
import p from "./PostsItem.module.css";

function PostList({ posts }) {
  return posts.map((post, index) => (
    <div className={p.postWrapper} key={index}>
      <div className={p.date}>{formatDate(post.created_time)}</div>
      <div className={p.message}>{post.message}</div>
    </div>
  ));
}
export default PostList;

import React from "react";
import PostList from "./PostsList";
import Input from "../input/Input";
import Div from "../div/Div";
import Button from "../button/Button";
import ArrowIcon from "../arrow/ArrowIcon";
import p from "./PostsItem.module.css";

function PostsItem({
  posts,
  value,
  setSearchPost,
  onClick,
  orderBy,
  handleLogout,
}) {
  return (
    <Div className={p.posts}>
      <Div className={p.postsWrapper}>
        <Div className={p.top}>
          <ArrowIcon
            onClick={onClick}
            className={orderBy === "asc" ? p.rotate : ""}
          />

          <Input
            value={value}
            onChange={({ target }) => setSearchPost(target.value)}
            placeholder="Search posts"
            className={p.right}
          />

          <Button className={p.logout} onClick={handleLogout}>
            Logout
          </Button>
        </Div>

        <PostList posts={posts} />
      </Div>
    </Div>
  );
}

export default PostsItem;

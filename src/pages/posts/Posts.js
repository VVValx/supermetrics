import React, { useState, useEffect, useContext } from "react";
import TokenContext from "../../contexts/TokenContext";
import UserContext from "../../contexts/UserContext";
import getToken from "../../utils/getToken";
import getAllUsers from "../../utils/getAllUsers";
import Div from "../../components/div/Div";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import sortBy from "../../utils/sortBy";
import Users from "../../components/users/Users";
import p from "./Posts.module.css";
import PostsItem from "../../components/posts/PostsItem";

function Posts() {
  const [users, setUsers] = useState([]);
  const [userToDisplayPost, setUserToDisplayPost] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchPost, setSearchPost] = useState("");
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState("desc");

  const { currentUser } = useContext(UserContext);
  const tokenContext = useContext(TokenContext);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const token = await getToken(tokenContext, currentUser);
      const users = await getAllUsers(token);

      users.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
      setUsers(users);
      setUserToDisplayPost(users[0].id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const filterUsers = (users) =>
    users.filter((user) => {
      const userToLower = user.name.toLowerCase();
      const s = searchName.toLocaleLowerCase();

      return (
        userToLower.startsWith(s) ||
        userToLower.endsWith(s) ||
        userToLower.includes(s)
      );
    });

  const filterPosts = (posts) =>
    posts.filter((post) => {
      const postToLower = post.message.toLowerCase();
      const s = searchPost.toLocaleLowerCase();

      return (
        postToLower.startsWith(s) ||
        postToLower.endsWith(s) ||
        postToLower.includes(s)
      );
    });

  const changeSortType = () =>
    orderBy === "desc" ? setOrderBy("asc") : setOrderBy("desc");

  if (loading) return <LoadingScreen />;

  const posts = users.filter((user) => user.id === userToDisplayPost)[0].posts;
  const sortedPosts = sortBy(posts, "created_time", orderBy);

  const postFilter =
    searchPost.length > 2 ? filterPosts(sortedPosts) : sortedPosts;

  const userFilter = searchName.length > 0 ? filterUsers(users) : users;

  return (
    <Div className={p.container}>
      <Users
        users={userFilter}
        userToDisplayPost={userToDisplayPost}
        setUserToDisplayPost={setUserToDisplayPost}
        value={searchName}
        setSearchName={setSearchName}
      />

      <PostsItem
        posts={postFilter}
        value={searchPost}
        setSearchPost={setSearchPost}
        onClick={changeSortType}
        orderBy={orderBy}
      />
    </Div>
  );
}

export default Posts;

import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import TokenContext from "../../contexts/TokenContext";
import UserContext from "../../contexts/UserContext";
import getToken from "../../utils/getToken";
import getAllUsers from "../../utils/getAllUsers";
import Div from "../../components/div/Div";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import sortBy from "../../utils/sortBy";
import Users from "../../components/users/Users";
import searchItems from "../../utils/searchItems";
import PostsItem from "../../components/posts/PostsItem";
import p from "./Posts.module.css";

function Posts() {
  const [users, setUsers] = useState([]);
  const [userToDisplayPost, setUserToDisplayPost] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchPost, setSearchPost] = useState("");
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState("desc");

  const { setAuth } = useContext(AuthContext);
  const { currentUser, setCurrentUser } = useContext(UserContext);
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

  const changeSortType = () =>
    orderBy === "desc" ? setOrderBy("asc") : setOrderBy("desc");

  const handleLogout = () => {
    setAuth(false);
    setCurrentUser(null);
    tokenContext.setTokenObj({ token: null, lastUpdate: null });
  };

  if (loading) return <LoadingScreen />;

  const posts = users.filter((user) => user.id === userToDisplayPost)[0].posts;
  const sortedPosts = sortBy(posts, "created_time", orderBy);

  const postFilter =
    searchPost.length > 2
      ? searchItems(sortedPosts, "message", searchPost)
      : sortedPosts;

  const userFilter =
    searchName.length > 0 ? searchItems(users, "name", searchName) : users;
  console.log("surs", users);
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
        handleLogout={handleLogout}
      />
    </Div>
  );
}

export default Posts;

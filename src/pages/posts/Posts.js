import React, { useState, useEffect, useContext } from "react";
import TokenContext from "../../contexts/TokenContext";
import UserContext from "../../contexts/UserContext";
import getToken from "../../utils/getToken";
import getPosts from "../../utils/getPosts";
import Container from "../../components/container/Container";
import formatDate from "../../utils/formatDate";
import p from "./Posts.module.css";

function Posts() {
  const [users, setUsers] = useState([]);
  const [userToDisplayPost, setUserToDisplayPost] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchPost, setSearchPost] = useState("");
  const [loading, setLoading] = useState(true);

  const { currentUser } = useContext(UserContext);
  const tokenContext = useContext(TokenContext);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const users = [];
    let page = 1;

    try {
      const token = await getToken(tokenContext, currentUser);
      while (page <= 10) {
        const posts = await getPosts(page, token);

        posts.forEach((post) => {
          const index = users.findIndex((user) => post.from_id === user.id);
          const postObj = {
            created_time: post.created_time,
            message: post.message,
          };
          if (index !== -1) {
            users[index].totalPost += 1;
            users[index].posts.push(postObj);
            return;
          }

          const newData = {
            id: post.from_id,
            name: post.from_name,
            posts: [postObj],
            totalPost: 1,
          };
          users.push(newData);
        });

        page += 1;
      }

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

  if (loading) return <p>Loading</p>;

  const posts = users.filter((user) => user.id === userToDisplayPost)[0].posts;
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.created_time) - new Date(a.created_time)
  );

  const postFilter =
    searchPost.length > 2 ? filterPosts(sortedPosts) : sortedPosts;

  const userFilter = searchName.length > 0 ? filterUsers(users) : users;

  console.log("sorted", sortedPosts);

  return (
    <Container className={p.container}>
      <div className={p.users}>
        <div className={p.searchContainer}>
          <input
            type="text"
            value={searchName}
            onChange={({ target }) => setSearchName(target.value)}
            placeholder="Search users"
          />
        </div>

        {userFilter.map((user) => (
          <div
            className={`${p.userWrapper} ${
              user.id === userToDisplayPost && "active"
            }`}
            key={user.id}
            onClick={() => setUserToDisplayPost(user.id)}
          >
            <div className={p.user}>{user.name}</div>
            <div className={p.count}>{user.totalPost}</div>
          </div>
        ))}
      </div>

      <div className={p.posts}>
        <div className={p.postsWrapper}>
          <div className={p.top}>
            <div className={p.left}>.</div>
            <div className={p.right}>
              <input
                type="text"
                value={searchPost}
                onChange={({ target }) => setSearchPost(target.value)}
                placeholder="Search posts"
              />
            </div>
          </div>

          {postFilter.map((post, index) => (
            <div className={p.postWrapper} key={index}>
              <div className={p.date}>{formatDate(post.created_time)}</div>
              <div className={p.message}>{post.message}</div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Posts;

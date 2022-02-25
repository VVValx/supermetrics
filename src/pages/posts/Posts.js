import React, { useState, useEffect, useContext } from "react";
import TokenContext from "../../contexts/TokenContext";
import UserContext from "../../contexts/UserContext";
import getToken from "../../utils/getToken";
import getPosts from "../../utils/getPosts";
import Container from "../../components/container/Container";
import p from "./Posts.module.css";

function Posts() {
  const [users, setUsers] = useState([]);

  const { currentUser } = useContext(UserContext);
  const tokenContext = useContext(TokenContext);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const users = [];
    let page = 1;

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
  };

  return (
    <Container className={p.container}>
      <div className={p.users}>
        <div className={p.searchContainer}>
          <input type="text" placeholder="Search user" />
        </div>

        {users.map((user) => (
          <div className={p.userWrapper} key={user.id}>
            <div className={p.user}>{user.name}</div>
            <div className={p.count}>{user.totalPost}</div>
          </div>
        ))}
      </div>

      <div className={p.posts}>sfgsf</div>
    </Container>
  );
}

export default Posts;

import getPosts from "./getPosts";

const getAllUsers = async (token) => {
  const users = [];
  let page = 1;
  try {
    while (page <= 10) {
      const posts = await getPosts(page, token);

      posts.forEach((post) => {
        const index = users.findIndex((user) => post.from_id === user.id);
        const postObj = {
          postId: post.id,
          created_time: post.created_time,
          message: post.message,
        };
        if (index !== -1) return users[index].posts.push(postObj);

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

    return users;
  } catch (error) {
    return error;
  }
};

export default getAllUsers;

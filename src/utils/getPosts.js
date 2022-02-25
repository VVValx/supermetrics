import urls from "../config/urls.json";

export default async (page, token) => {
  const url = `${urls.posts}?page=${page}&sl_token=${token}`;
  const response = await fetch(url);
  const result = await response.json();

  return result.data.posts;
};

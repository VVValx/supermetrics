import fetchData from "./fetchData";
import urls from "../config/urls.json";

export default async (page, token) => {
  const url = `${urls.posts}?page=${page}&sl_token=${token}`;
  const result = await fetchData(url);

  return result.data.posts;
};

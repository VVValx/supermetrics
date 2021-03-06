import urls from "../config/urls.json";
import apiCall from "../services/apiCall";

const getNewToken = async (data) => {
  const newData = { client_id: process.env.REACT_APP_CLIENT_ID, ...data };
  const result = await apiCall({ url: urls.register, body: newData });
  return result.data.sl_token;
};

export default getNewToken;

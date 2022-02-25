import getNewToken from "../utils/getNewToken";

export default async function useGetToken(tokenContext, currentUser) {
  const { tokenObj, setTokenObj } = tokenContext;
  const { token, lastUpdated } = tokenObj;

  const timeDiff = (new Date() - new Date(lastUpdated)) / 1000;

  if (timeDiff < 3600) return token;

  try {
    const token = await getNewToken(currentUser);

    setTokenObj({ token, lastUpdated: new Date() });
  } catch (error) {
    console.log(error);
  }

  return token;
}

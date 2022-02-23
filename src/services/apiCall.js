const apiCall = async ({ url, method = "post", body }) => {
  try {
    const config = {
      method,
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    };

    const response = await fetch(url, config);
    return await response.json();
  } catch (error) {
    return error;
  }
};

export default apiCall;

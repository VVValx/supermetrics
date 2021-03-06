const isEmailValid = (email) => {
  const validation = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return new RegExp(validation).test(email);
};

export default isEmailValid;

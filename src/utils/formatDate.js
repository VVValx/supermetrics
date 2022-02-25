import months from "../config/months.json";

const formatDate = (date) => {
  const newDate = new Date(date);
  const month = newDate.getMonth();
  const dayofMonth = newDate.getDate();
  const year = newDate.getFullYear();
  const hours = formateTime(newDate.getHours());
  const minutes = formateTime(newDate.getMinutes());
  const seconds = formateTime(newDate.getSeconds());
  return `${months[month]} ${dayofMonth}, ${year} ${hours}:${minutes}:${seconds} `;
};

const formateTime = (time) => (time < 10 ? `0${time}` : time);

export default formatDate;

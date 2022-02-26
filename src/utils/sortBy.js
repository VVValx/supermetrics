const sortBy = (items, property, sortType) =>
  items.sort((a, b) => {
    return sortType === "desc"
      ? new Date(b[property]) - new Date(a[property])
      : new Date(a[property]) - new Date(b[property]);
  });

export default sortBy;

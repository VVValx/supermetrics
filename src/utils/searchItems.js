const searchItems = (items, property, inputValue) =>
  items.filter((item) => {
    const itemToLower = item[property].toLowerCase();
    const s = inputValue.toLocaleLowerCase();

    return itemToLower.includes(s);
  });

export default searchItems;

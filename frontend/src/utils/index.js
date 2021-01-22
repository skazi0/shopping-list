import unidecode from "unidecode";

export const findIndexByID = (items, id) =>
  items.findIndex((item) => item.id === id);

export const findByID = (items, id) => items.find((item) => item.id === id);

export const findByName = (items, name) => {
  const checkName = unidecode(name).toLowerCase();
  return items.find((item) => unidecode(item.name).toLowerCase() === checkName);
};

export const replaceItemAtIndex = (items, index, item) => [
  ...items.slice(0, index),
  item,
  ...items.slice(index + 1),
];

export const patchItemAtIndex = (items, index, patch) => [
  ...items.slice(0, index),
  { ...items[index], ...patch },
  ...items.slice(index + 1),
];

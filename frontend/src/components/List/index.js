import React, { useEffect, useState } from "react";
import ListItem from "../ListItem";

// const list2dict = (list) => {
//   return list.reduce((a, x) => ({ ...a, [x.id]: x }), {});
// };

const List = () => {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    const url = "api/items";

    const response = await fetch(url);
    const items = await response.json();
    setItems(items);
  };

  useEffect(() => {
    getItems();
  }, []);

  // const setItemCategory = useCallback(
  //   (itemId, category) => {
  //     // TODO: call api
  //     setItems({
  //       ...items,
  //       [itemId]: { ...items[itemId], category_id: category.id },
  //     });
  //   },
  //   [items]
  // );

  return (
    <div>
      {items.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default List;

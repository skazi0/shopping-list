import React, { useState } from "react";
import Category from "../Category";

const ListItem = ({ item: initialItem }) => {
  const [item, setItem] = useState(initialItem);

  const setCategory = (category) => {
    // TODO: call api
    console.log("calling api to set item category");
    setItem({
      ...item,
      category_id: category.id,
    });
  };

  return (
    <div>
      {item.name}
      {<span>[{item.category_id}]</span>}
      <Category categoryId={item.category_id} onChange={setCategory} />
    </div>
  );
};

export default ListItem;

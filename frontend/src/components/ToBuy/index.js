import React, { useContext } from "react";

import { Store } from "../../data/Store";

import { findByID } from "../../utils";

const ToBuy = () => {
  const { tobuy, items } = useContext(Store);

  return (
    <div style={{ float: "right" }}>
      kup
      {tobuy.map((tb) => {
        const item = findByID(items, tb.item_id);
        return (
          <div key={tb.id}>
            {item && <span>{item.name}</span>}
            {item && <span>[{item.category_id}]</span>}
            <span>[{tb.comment}]</span>
          </div>
        );
      })}
    </div>
  );
};

export default ToBuy;

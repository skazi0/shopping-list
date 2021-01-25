import React, { useContext } from "react";
import { Divider } from "antd";

import Search from "../Search";
import ToBuyItem from "../ToBuyItem";

import { Store } from "../../data/Store";

import { findByID } from "../../utils";

const ToBuy = () => {
  const { tobuy, items, categories } = useContext(Store);

  const itemsCategoryTree = () => {
    const tobuyItems = tobuy.map((tb) => ({
      ...tb,
      item: findByID(items, tb.item_id),
    }));
    const usedCategories = tobuyItems.reduce(
      (ret, tb) =>
        ret.includes(tb.item.category_id) ? ret : [...ret, tb.item.category_id],
      []
    );

    return usedCategories
      .map((categoryId) => ({
        ...findByID(categories, categoryId),
        tobuy: tobuyItems
          .filter((tb) => tb.item.category_id === categoryId)
          .sort((a, b) => a.item.name.localeCompare(b.item.name)),
      }))
      .sort((a, b) => b.priority - a.priority);
  };

  return (
    <div style={{ border: "1px solid blue", width: "25rem" }}>
      <Search items={items} />
      {itemsCategoryTree().map((category) => (
        <div key={category.id}>
          <Divider plain orientation="left">
            {category.name}
          </Divider>
          {category.tobuy.map((tb) => (
            <ToBuyItem tb={tb} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ToBuy;

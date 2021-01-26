import React, { useContext } from "react";
import { Menu, Dropdown, Button } from "antd";

import { Store } from "../../data/Store";

import "./index.less";

const Category = ({ categoryId: currentId, onChange }) => {
  const { categories } = useContext(Store);

  const menu = (
    <Menu>
      {categories.map((category) => (
        <Menu.Item key={category.id}>
          <span
            onClick={() => {
              onChange(category);
            }}
            className={
              category.id === currentId ? "category current" : "category"
            }
          >
            {category.name}
          </span>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Button type="default" size="small">
        {currentId}
      </Button>
    </Dropdown>
  );
};

export default Category;

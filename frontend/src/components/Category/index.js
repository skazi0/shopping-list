import React, { useContext } from "react";
import { Menu, Dropdown, Button } from "antd";

import { Store } from "../../data/Store";

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
            style={{ color: category.id === currentId ? "red" : "black" }}
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

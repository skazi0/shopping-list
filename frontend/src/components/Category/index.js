import React, { useContext } from "react";

import Store from "../../data/Store";

const Category = ({ categoryId: currentId, onChange }) => {
  const { categories } = useContext(Store);

  return (
    <div>
      <ul style={{ display: "none1" }}>
        {categories.map((category) => (
          <li key={category.id}>
            <span
              style={{ color: category.id === currentId ? "red" : "black" }}
            >
              {category.name}
            </span>
            <button
              onClick={() => {
                onChange(category);
              }}
            >
              select
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;

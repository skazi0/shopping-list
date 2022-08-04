import React, { useContext } from "react";
import { Select } from "antd";
import { FilterFilled } from "@ant-design/icons";

import { Dispatch, Store } from "../../data/Store";

import "./index.less";

const Filter = ({ items }) => {
  const { categories } = useContext(Store);
  const dispatch = useContext(Dispatch);

  const setCategory = (option) => {
    dispatch({ type: "setFilter", value: { category_id: option.value } });
  };

  return (
    <div className="filter">
      <FilterFilled />
      <Select
        dropdownMatchSelectWidth={false}
        defaultValue={-1}
        onSelect={(_, option) => setCategory(option)}
      >
        <Select.Option key={-1} value={-1}>
          Wszystkie
        </Select.Option>
        {categories.map((category) => (
          <Select.Option key={category.id} value={category.id}>
            {category.name}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default Filter;

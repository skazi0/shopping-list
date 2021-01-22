import React, { useContext } from "react";
import { Button } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import Category from "../Category";

import { toBuyApiService, itemsApiService } from "../../api";

import { Store, Dispatch } from "../../data/Store";

const ListItem = ({ item }) => {
  const { tobuy } = useContext(Store);
  const dispatch = useContext(Dispatch);

  const setCategory = async (category) => {
    try {
      await itemsApiService.patchOne(item.id, {
        category_id: category.id,
      });
      dispatch({ type: "setItemCategory", item: item, value: category });
    } catch (error) {
      alert("error: " + error.message);
    }
  };

  const addToBuy = async () => {
    try {
      const response = await toBuyApiService.addOne({
        item_id: item.id,
        comment: "",
      });
      dispatch({ type: "addToBuy", value: response });
    } catch (error) {
      alert("error: " + error.message);
    }
  };

  const deleteItem = async () => {
    // TODO: confirmation box
    try {
      await itemsApiService.deleteOne(item.id);
      dispatch({ type: "deleteItem", value: item });
    } catch (error) {
      alert("error: " + error.message);
    }
  };

  const isOnToBuy = (item_id) =>
    tobuy.find((tb) => tb.item_id === item_id) !== undefined;

  return (
    <>
      <Button
        type="primary"
        size="small"
        disabled={isOnToBuy(item.id)}
        onClick={addToBuy}
      >
        <PlusOutlined />
      </Button>
      <span style={{ marginRight: "auto", marginLeft: "1rem" }}>
        {item.name}
      </span>
      <div style={{ float: "right" }}>
        <Category categoryId={item.category_id} onChange={setCategory} />
        <Button type="default" danger size="small" onClick={deleteItem}>
          <DeleteOutlined />
        </Button>
      </div>
    </>
  );
};

export default ListItem;

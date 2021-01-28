import React, { useContext } from "react";
import { Button, Popconfirm, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import Category from "../Category";

import { toBuyApiService, itemsApiService } from "../../api";

import { Store, Dispatch } from "../../data/Store";

import "./index.less";

const ListItem = ({ id, category_id, name }) => {
  const { tobuy } = useContext(Store);
  const dispatch = useContext(Dispatch);

  const setCategory = async (category) => {
    try {
      await itemsApiService.patchOne(id, {
        category_id: category.id,
      });
      dispatch({ type: "setItemCategory", id, value: category });
    } catch (error) {
      message.error(error.message);
    }
  };

  const addToBuy = async () => {
    try {
      const response = await toBuyApiService.addOne({
        item_id: id,
        comment: "",
      });
      dispatch({ type: "addToBuy", value: response });
    } catch (error) {
      message.error(error.message);
    }
  };

  const deleteItem = async () => {
    // TODO: confirmation box
    try {
      await itemsApiService.deleteOne(id);
      dispatch({ type: "deleteItem", id });
    } catch (error) {
      message.error(error.message);
    }
  };

  const isOnToBuy = (item_id) =>
    tobuy.find((tb) => tb.item_id === item_id) !== undefined;

  return (
    <div className="listitem">
      <Button type="primary" disabled={isOnToBuy(id)} onClick={addToBuy}>
        <PlusOutlined />
      </Button>
      <div style={{ marginRight: "auto", marginLeft: "1rem" }}>{name}</div>
      <div>
        <Category categoryId={category_id} onChange={setCategory} />
        <Popconfirm onConfirm={deleteItem} title="Na pewno usunąć ten element?">
          <Button type="default" danger>
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default ListItem;

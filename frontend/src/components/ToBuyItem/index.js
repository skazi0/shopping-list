import React, { useContext, useState } from "react";
import {
  Checkbox,
  Typography,
  Button,
  Tooltip,
  Popconfirm,
  message,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { toBuyApiService } from "../../api";

import { Dispatch } from "../../data/Store";

import "./index.less";

const ToBuyItem = ({ id, item, comment }) => {
  const dispatch = useContext(Dispatch);
  const [hover, setHover] = useState(false);

  const markBought = async (e) => {
    if (!e.target.checked) return;
    try {
      await toBuyApiService.runAction(id, "buy");
      dispatch({ type: "deleteToBuy", id });
    } catch (error) {
      message.error(error.message);
    }
  };

  const deleteItem = async (e) => {
    try {
      await toBuyApiService.deleteOne(id);
      dispatch({ type: "deleteToBuy", id });
    } catch (error) {
      message.error(error.message);
    }
  };

  const setComment = async (text) => {
    try {
      await toBuyApiService.patchOne(id, {
        comment: text,
      });
      dispatch({ type: "setToBuyComment", id, value: text });
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div
      className="tbitem"
      onMouseEnter={(e) => setHover(true)}
      onMouseLeave={(e) => setHover(false)}
    >
      <Checkbox onChange={markBought}>{item.name}</Checkbox>
      <Typography.Text
        style={{ display: "inline-block" }}
        type="secondary"
        editable={{ onChange: setComment, tooltip: "Komentarz" }}
      >
        {comment}
      </Typography.Text>
      <span className="actions">
        <Popconfirm onConfirm={deleteItem} title="Na pewno usunąć ten element?">
          <Tooltip title="Kasuj">
            <Button type="text" danger>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Popconfirm>
      </span>
    </div>
  );
};

export default ToBuyItem;

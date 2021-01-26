import React, { useContext, useState } from "react";
import { Checkbox, Typography, Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { toBuyApiService } from "../../api";

import { Dispatch } from "../../data/Store";

import "./index.less";

const ToBuyItem = ({ tb }) => {
  const dispatch = useContext(Dispatch);
  const [hover, setHover] = useState(false);

  const markBought = async (e) => {
    if (!e.target.checked) return;
    try {
      await toBuyApiService.runAction(tb.id, "buy");
      dispatch({ type: "deleteToBuy", value: tb.id });
    } catch (error) {
      alert("error: " + error.message);
    }
  };

  const deleteItem = async (e) => {
    // TODO: confirmation box
    try {
      await toBuyApiService.deleteOne(tb.id);
      dispatch({ type: "deleteToBuy", value: tb.id });
    } catch (error) {
      alert("error: " + error.message);
    }
  };

  const setComment = async (text) => {
    try {
      await toBuyApiService.patchOne(tb.id, {
        comment: text,
      });
      dispatch({ type: "setToBuyComment", tb, value: text });
    } catch (error) {
      alert("error: " + error.message);
    }
  };
  return (
    <div
      className="tbitem"
      onMouseEnter={(e) => setHover(true)}
      onMouseLeave={(e) => setHover(false)}
    >
      <Checkbox onChange={markBought}>{tb.item.name}</Checkbox>
      <Typography.Text
        style={{ display: "inline-block" }}
        type="secondary"
        editable={{ onChange: setComment, tooltip: "Komentarz" }}
      >
        {tb.comment}
      </Typography.Text>
      <span className="actions">
        <Tooltip title="Kasuj">
          <Button onClick={deleteItem} type="text" size="small" danger>
            <DeleteOutlined />
          </Button>
        </Tooltip>
      </span>
    </div>
  );
};

export default ToBuyItem;

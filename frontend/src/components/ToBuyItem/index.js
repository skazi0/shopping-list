import React, { useContext } from "react";
import { Checkbox, Typography } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import { toBuyApiService } from "../../api";

import { Dispatch } from "../../data/Store";

const ToBuyItem = ({ tb }) => {
  const dispatch = useContext(Dispatch);

  const markBought = async (e) => {
    if (!e.target.checked) return;
    try {
      await toBuyApiService.runAction(tb.id, "buy");
      dispatch({ type: "markBought", value: tb.id });
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
    <div>
      <Checkbox onChange={markBought}>{tb.item.name}</Checkbox>
      <Typography.Text
        style={{ display: "inline-block" }}
        type="secondary"
        editable={{ onChange: setComment, tooltip: "Komentarz" }}
      >
        {tb.comment}
      </Typography.Text>
    </div>
  );
};

export default ToBuyItem;

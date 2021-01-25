import React, { useContext } from "react";
import { Checkbox, Typography } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import { toBuyApiService } from "../../api";

import { Dispatch } from "../../data/Store";

const ToBuyItem = ({ tb }) => {
  const dispatch = useContext(Dispatch);

  const buy = (e) => {
    console.log("bought: ", tb.item.name);
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
      <Checkbox onChange={buy}>{tb.item.name}</Checkbox>
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

import React from "react";

const ToBuyItem = ({ tb }) => {
  return (
    <div key={tb.id}>
      <span>{tb.item.name}</span>
      <span>[{tb.comment}]</span>
    </div>
  );
};

export default ToBuyItem;

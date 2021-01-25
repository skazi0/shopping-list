import React, { useContext } from "react";
import { List as AList } from "antd";
import { FixedSizeList } from "react-window";

import ListItem from "../ListItem";

import { Store } from "../../data/Store";

const List = () => {
  const { items } = useContext(Store);

  const Row = ({ index, style }) => (
    <AList.Item style={style}>
      <ListItem key={items[index].id} item={items[index]} />
    </AList.Item>
  );

  return (
    <div
      style={{
        border: "1px solid red",
        width: "25rem",
        margin: "0 auto",
        padding: "1rem 0",
      }}
    >
      <AList size="small">
        <FixedSizeList
          height={window.innerHeight}
          itemCount={items.length}
          itemSize={30}
          overscanCount={20}
        >
          {Row}
        </FixedSizeList>
      </AList>
    </div>
  );
};

export default List;

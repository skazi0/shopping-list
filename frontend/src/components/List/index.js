import React, { useContext } from "react";
import { List as AList, Divider } from "antd";
import { FixedSizeList } from "react-window";

import ListItem from "../ListItem";
import Search from "../Search";

import { Store } from "../../data/Store";

const List = () => {
  const { items } = useContext(Store);

  const Row = ({ index, style }) => (
    <AList.Item style={style}>
      <ListItem key={items[index].id} item={items[index]} />
    </AList.Item>
  );

  return (
    <div style={{ border: "1px solid red", width: "350px" }}>
      <Search items={items} />
      <Divider style={{ clear: "none" }} />
      <AList size="small">
        <FixedSizeList
          height={window.innerHeight}
          itemCount={items.length}
          itemSize={30}
          overscanCount={10}
        >
          {Row}
        </FixedSizeList>
      </AList>
    </div>
  );
};

export default List;

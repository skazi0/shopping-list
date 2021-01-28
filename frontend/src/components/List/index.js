import React, { useContext } from "react";
import { List as AList } from "antd";
import { FixedSizeList } from "react-window";

import ListItem from "../ListItem";

import { Store } from "../../data/Store";

const List = () => {
  const { items } = useContext(Store);

  const Row = ({ index, style }) => (
    <AList.Item style={style}>
      <ListItem key={items[index].id} {...items[index]} />
    </AList.Item>
  );

  return (
    <div className="panel">
      <AList size="small">
        <FixedSizeList
          height={window.innerHeight} // subtract size needed for header and padding
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

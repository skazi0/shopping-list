import React, { useContext, useMemo } from "react";
import { List as AList } from "antd";
import { FixedSizeList } from "react-window";

import ListItem from "../ListItem";
import Filter from "../Filter";

import { Store } from "../../data/Store";

const List = () => {
  const { items, filter } = useContext(Store);
  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
          filter.category_id === -1 || item.category_id === filter.category_id
      ),
    [items, filter]
  );

  const Row = ({ index, style }) => (
    <AList.Item style={style}>
      <ListItem key={filteredItems[index].id} {...filteredItems[index]} />
    </AList.Item>
  );

  return (
    <div className="panel">
      <Filter />
      <AList size="small">
        <FixedSizeList
          height={window.innerHeight} // subtract size needed for header and padding
          itemCount={filteredItems.length}
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

import React, { useState, useContext } from "react";
import unidecode from "unidecode";
import { AutoComplete, Input, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { Dispatch } from "../../data/Store";

import { toBuyApiService, itemsApiService } from "../../api";
import { findByName } from "../../utils";

import "./index.less";

const Search = ({ items }) => {
  const dispatch = useContext(Dispatch);

  const [found, setFound] = useState([]);
  const [value, setValue] = useState();

  let timer = null;

  const find = (text) => {
    setFound(
      items
        .filter((item) => {
          const basicName = unidecode(item.name);
          // case insensitive match
          const index = basicName
            .toLowerCase()
            .indexOf(unidecode(text.toLowerCase()));
          // only take results matching start of word
          return index !== -1 && (index === 0 || basicName[index - 1] === " ");
        })
        .sort((a, b) => b.count - a.count)
        .slice(0, 15)
        .map((item) => ({
          value: item.name,
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{item.name}</span>
              <span style={{ color: "green" }}>{item.count}</span>
            </div>
          ),
        }))
    );
  };

  const addToBuy = async (text) => {
    //console.log("adding", text);
    let item = findByName(items, text);
    if (!item) {
      // TODO: check if items exists in the DB
      //item = await itemsApiService.getOneByName(...)
      try {
        // TODO: set default category
        item = await itemsApiService.addOne({
          name: text,
          category_id: 0,
        });
        dispatch({ type: "addItem", value: item });
      } catch (error) {
        message.error(error.message);
        return;
      }
    }

    try {
      const response = await toBuyApiService.addOne({ item_id: item.id });
      dispatch({ type: "addToBuy", value: response });
    } catch (error) {
      // duplicate error can be safely ignored
      if (error.code !== 409) {
        message.error(error.message);
      }
    }
    setValue("");
    // this is not strictly needed as render will reset timer variable
    timer = null;
  };

  const addToBuyDebounce = (text) => {
    // this function can be triggered by multiple events for one item
    // use timer trick to "squash" them into one operation
    // if there's no re-render between calls which need to be squashed then
    // timer can be a local variable
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      addToBuy(text);
    }, 0);
  };

  return (
    <AutoComplete
      backfill={true}
      autoFocus={true}
      style={{ width: "100%" }}
      options={found}
      value={value}
      onChange={setValue}
      onSearch={find}
      onSelect={(v, o) => {
        // console.log("select", v, o);
        addToBuyDebounce(v);
      }}
    >
      <Input.Search
        size="small"
        placeholder="co kupić?"
        onSearch={(v, e) => {
          // console.log("search", v);
          addToBuyDebounce(v);
        }}
        enterButton={
          <Button type="primary">
            <PlusOutlined />
          </Button>
        }
      />
    </AutoComplete>
  );
};

export default Search;

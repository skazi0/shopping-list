import React, { useReducer, useEffect } from "react";

import {
  itemsApiService,
  categoriesApiService,
  toBuyApiService,
} from "../../api";
import { findIndexByID, patchItemAtIndex } from "../../utils";

const initialState = {
  items: [],
  categories: [],
  tobuy: [],
};
export const Store = React.createContext();
export const Dispatch = React.createContext({});

const storeReducer = (state, action) => {
  switch (action.type) {
    // general data setters (for loading)
    case "setCategories":
      return { ...state, categories: action.value };
    case "setItems":
      return { ...state, items: action.value };
    case "setToBuy":
      return { ...state, tobuy: action.value };

    // user actions
    case "addItem":
      return { ...state, items: [action.value, ...state.items] };
    case "deleteItem":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.value.id),
        tobuy: state.tobuy.filter((tb) => tb.item_id !== action.value.id),
      };
    case "setItemCategory": {
      const index = findIndexByID(state.items, action.item.id);
      return {
        ...state,
        items: patchItemAtIndex(state.items, index, {
          category_id: action.value.id,
        }),
      };
    }
    case "addToBuy":
      return {
        ...state,
        tobuy: [...state.tobuy, action.value],
      };
    case "setToBuyComment": {
      const index = findIndexByID(state.tobuy, action.tb.id);
      return {
        ...state,
        tobuy: patchItemAtIndex(state.tobuy, index, { comment: action.value }),
      };
    }
    default:
      throw new Error("Unknow action type");
  }
};

export const DataStore = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  const getCategories = async () => {
    const categories = await categoriesApiService.getAll();
    categories.sort((a, b) => b.priority - a.priority);
    dispatch({ type: "setCategories", value: categories });
  };

  const getItems = async () => {
    const items = await itemsApiService.getAll();
    items.sort((a, b) => a.name.localeCompare(b.name));
    dispatch({ type: "setItems", value: items });
  };

  const getToBuy = async () => {
    const tobuy = await toBuyApiService.getAll();
    dispatch({ type: "setToBuy", value: tobuy });
  };

  useEffect(() => {
    getCategories();
    getItems();
    getToBuy();
  }, []);

  return (
    <Store.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </Store.Provider>
  );
};

export default DataStore;

import React, { useReducer, useEffect } from "react";

import {
  itemsApiService,
  categoriesApiService,
  toBuyApiService,
} from "../../api";
import { patchItemByID } from "../../utils";

const initialState = {
  filter: { category_id: -1 },
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
        items: state.items.filter((item) => item.id !== action.id),
        tobuy: state.tobuy.filter((tb) => tb.item_id !== action.id),
      };
    case "setItemCategory":
      return {
        ...state,
        items: patchItemByID(state.items, action.id, {
          category_id: action.value.id,
        }),
      };
    case "addToBuy":
      return {
        ...state,
        tobuy: [...state.tobuy, action.value],
      };
    case "setToBuyComment":
      return {
        ...state,
        tobuy: patchItemByID(state.tobuy, action.id, {
          comment: action.value,
        }),
      };
    case "deleteToBuy":
      return {
        ...state,
        tobuy: state.tobuy.filter((tb) => tb.id !== action.id),
      };
    case "setFilter":
      return {
        ...state,
        filter: action.value,
      };
    default:
      throw new Error("Unknow action type");
  }
};

export const DataStore = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  const getCategories = async () => {
    try {
      const categories = await categoriesApiService.getAll();
      categories.sort((a, b) => b.priority - a.priority);
      dispatch({ type: "setCategories", value: categories });
    } catch (error) {}
  };

  const getItems = async () => {
    try {
      const items = await itemsApiService.getAll();
      items.sort((a, b) => a.name.localeCompare(b.name));
      dispatch({ type: "setItems", value: items });
    } catch (error) {}
  };

  const getToBuy = async () => {
    try {
      const tobuy = await toBuyApiService.getAll();
      dispatch({ type: "setToBuy", value: tobuy });
    } catch (error) {}
  };

  useEffect(() => {
    getCategories();
    getItems();
    getToBuy();
  }, []);

  return (
    <Dispatch.Provider value={dispatch}>
      <Store.Provider value={state}>{children}</Store.Provider>
    </Dispatch.Provider>
  );
};

export default DataStore;

import React, { useState, useEffect } from "react";

const Store = React.createContext({ categories: [] });

export const DataStore = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const url = "api/categories";

    const response = await fetch(url);
    const categories = await response.json();
    categories.sort((a, b) => b.priority - a.priority);
    setCategories(categories);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Store.Provider
      value={{
        categories,
      }}
    >
      {children}
    </Store.Provider>
  );
};

export default Store;

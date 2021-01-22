import React from "react";
import List from "./components/List";
import ToBuy from "./components/ToBuy";

import DataStore from "./data/Store";

import "./App.less";

function App() {
  return (
    <DataStore>
      <ToBuy />
      <List />
    </DataStore>
  );
}

export default App;

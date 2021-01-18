import React from "react";
import List from "./components/List";
import { DataStore } from "./data/Store";
//import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <DataStore>
      <List />
    </DataStore>
  );
}

export default App;

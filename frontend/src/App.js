import React from "react";
import { Row, Col } from "antd";

import List from "./components/List";
import ToBuy from "./components/ToBuy";

import DataStore from "./data/Store";

import "./App.less";

function App() {
  return (
    <DataStore>
      <Row gutter={[16, 16]}>
        <Col xs={0} sm={24}></Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col
          lg={{ span: 8, offset: 4 }}
          md={{ span: 10, offset: 2 }}
          xs={{ span: 24, offset: 0 }}
        >
          <ToBuy />
        </Col>
        <Col lg={{ span: 8 }} md={{ span: 10 }} xs={{ span: 24 }}>
          <List />
        </Col>
      </Row>
    </DataStore>
  );
}

export default App;

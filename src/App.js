import React from "react";
import "./App.css";
import "antd/dist/antd.css";

import TableComponent from "./components/Table";

function App() {
  return (
    <div className="App App-header">
      <h2>
        CRUD usando API <a href="https://sheet.best/">sheet.best</a>
      </h2>
      <TableComponent />
    </div>
  );
}

export default App;

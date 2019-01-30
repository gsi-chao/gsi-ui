import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { VTable } from "./components/Table/Table";

class App extends Component {
  render() {
    const data = [
      { name: "Carlos", lastname: "Chao" },
      { name: "Leticia", lastname: "Larrosa" },
      { name: "Leticia", lastname: "Larrosa" },
      { name: "Leticia", lastname: "Larrosa" },
      { name: "Leticia", lastname: "Larrosa" },
      { name: "Leticia", lastname: "Larrosa" },
      { name: "Leticia", lastname: "Larrosa" },
      { name: "Leticia", lastname: "Larrosa" },
      { name: "Leticia", lastname: "Larrosa" },
      { name: "Leticia", lastname: "Larrosa" },
      { name: "Leticia", lastname: "Larrosa" },
      { name: "Leticia", lastname: "Larrosa" },
      { name: "Leticia", lastname: "Larrosa" },
      { name: "Leticia", lastname: "Larrosa" }
    ];
    return (
      <VTable
        edit={{ columns: ["name"] }}
        columns={["name", "lastname"]}
        data={data}
      />
    );
  }
}

export default App;

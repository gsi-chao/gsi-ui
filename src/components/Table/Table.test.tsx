import React from "react";
import ReactDOM from "react-dom";
import { VTable } from "./Table";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const data = [
    {
      test: "test1"
    },
    { test: "test2" }
  ];
  ReactDOM.render(<VTable columns={["test"]} data={data} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

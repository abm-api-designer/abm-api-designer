import { screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import ServersPage from "./ServersPage";

it("should render", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ServersPage />, div);
  expect(screen.getAllByText("Add Server")).toBeInTheDocument();
});

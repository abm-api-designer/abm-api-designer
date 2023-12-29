import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // for expect assertions

import ServerURLVariables, {
  VariableType,
} from "../../../src/components/servers/ServerURLVariables";
import userEvent from "@testing-library/user-event";

xdescribe("ServerURLVariables component", () => {
  test("renders the component", () => {
    const variables = [
      {
        name: "var1",
        type: VariableType.STRING,
        default: "default1",
        description: "desc1",
      },
      {
        name: "var2",
        type: VariableType.ENUM,
        default: "default2",
        description: "desc2",
      },
    ];

    const setVariablesMock = jest.fn();

    render(
      <ServerURLVariables
        variables={variables}
        setVariables={setVariablesMock}
      />
    );

    // Check if the component renders correctly
    expect(screen.getByText("URL Variables")).toBeInTheDocument();
    expect(screen.getAllByTestId("var-row")).toHaveLength(variables.length);

    // Add more assertions as needed
  });

  test("clicking add new variable button adds a new variable", () => {
    const variables = [
      {
        name: "var1",
        type: VariableType.STRING,
        default: "default1",
        description: "desc1",
      },
    ];

    const setVariablesMock = jest.fn();

    render(
      <ServerURLVariables
        variables={variables}
        setVariables={setVariablesMock}
      />
    );

    // Click the "Add New Var" button
    fireEvent.click(screen.getByTestId("add-new-var-btn"));

    // Check if the setVariables function was called with the correct arguments
    expect(setVariablesMock).toHaveBeenCalledWith([
      ...variables,
      { name: "", type: VariableType.STRING, description: "", default: "" },
    ]);

    // Add more assertions as needed
  });

  test("selecting a variable type triggers the correct function", async () => {
    const variables = [
      {
        name: "var1",
        type: VariableType.STRING,
        default: "default1",
        description: "desc1",
      },
    ];

    const setVariablesMock = jest.fn();

    render(
      <ServerURLVariables
        variables={variables}
        setVariables={setVariablesMock}
      />
    );

    // Simulate user clicking on the Select component
    act(() => {
      userEvent.click(screen.getByTestId("var-type-0"));
    });

    // Wait for the dropdown to be rendered
    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    // Select a variable type in the dropdown
    fireEvent.click(screen.getByText("Enum"));

    // Check if the handleOnVariableTypeSelection function was called with the correct arguments
    expect(setVariablesMock).toHaveBeenCalledWith(variables); // You might need to adjust this based on your actual implementation

    // Add more assertions as needed
  });

  // Add more test cases as needed
});

import { Meta, StoryObj } from "@storybook/react";
import ServerURLVariables, {
  SimpleServerVariable,
  VariableType,
} from "../../../components/servers/ServerURLVariables";
import {
  ExistingVariablesMockedState,
  MockStoreProps,
  MockedState,
} from "../../common/SampleData";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { userEvent, within } from "@storybook/testing-library";
import {
  assertElementIsVisible,
  assertServerVariables,
} from "../../common/AssertionsCatalogue";
import { expect } from "@storybook/jest";

var variablesInput: SimpleServerVariable[] = [];

const meta: Meta<typeof ServerURLVariables> = {
  title: "API Designer/Components/Servers/ServerURLVariables",
  component: ServerURLVariables,
  excludeStories: /.*MockedState$/,
};

export default meta;

type Story = StoryObj<typeof ServerURLVariables>;

const MockStore = ({ projectState, children }: MockStoreProps) => (
  <Provider
    store={configureStore({
      reducer: {
        project: createSlice({
          name: "project",
          initialState: projectState,
          reducers: {},
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export const AddNewVariable: Story = {
  decorators: [
    (story) => <MockStore projectState={MockedState}>{story()}</MockStore>,
  ],
  args: {
    variables: variablesInput,
    setVariables: (value: React.SetStateAction<SimpleServerVariable[]>) => {
      const data = value as SimpleServerVariable[];
      data.forEach((item) => variablesInput.push(item));
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const addNewVarBtn = await canvas.getByTestId("add-new-var-btn");
    await userEvent.click(addNewVarBtn);

    await assertServerVariables(variablesInput);
    variablesInput = [];
  },
};

export const ShowingAddedVariables: Story = {
  args: {
    variables: [
      {
        name: "port",
        description: "The server running port",
        type: VariableType.ENUM,
        default: "",
      },
    ],
    setVariables: (value: React.SetStateAction<SimpleServerVariable[]>) => {},
  },
  decorators: [
    (story) => (
      <MockStore projectState={ExistingVariablesMockedState}>
        {story()}
      </MockStore>
    ),
  ],
  play: async ({ canvasElement }) => {
    assertElementIsVisible(canvasElement, "var-name-0");
    assertElementIsVisible(canvasElement, "var-type-0");
    assertElementIsVisible(canvasElement, "var-default-0");
    assertElementIsVisible(canvasElement, "var-del-btn-0");
  },
};

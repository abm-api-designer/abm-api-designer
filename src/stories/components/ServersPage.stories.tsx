import { Meta, StoryObj } from "@storybook/react";
import ServersPage from "../../components/ServersPage";
import { EmptyMockedState, MockStoreProps } from "../common/SampleData";
import { Provider } from "react-redux";
import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { ServerInfoPayload } from "../../data/payload/ServerInfoPayload";
import { enterInputValue } from "../common/FormFiller";
import { clickButton } from "../common/FormActions";
import {
  assertAddServerFormIsReset,
  assertElementIsVisible,
  assertInputValue,
} from "../common/AssertionsCatalogue";
import { expect } from "@storybook/jest";
import { ProjectEntity, ServerEntity } from "../../models/SwaggerModels";
import { useAppSelector } from "../../data/hooks";
import { assertAddServerDataSaved } from "../common/ReduxStoreDataAssertions";
import { resetArray } from "../common/Util";

const meta: Meta<typeof ServersPage> = {
  title: "API Designer/Components/ServersPage",
  component: ServersPage,
  excludeStories: /.*MockedState$/,
};

export default meta;

type Story = StoryObj<typeof ServersPage>;
const captured: ServerEntity[] = [];

const MockStore = ({ projectState, children }: MockStoreProps) => (
  <Provider
    store={configureStore({
      reducer: {
        project: createSlice({
          name: "project",
          initialState: projectState,
          reducers: {
            addServer: (
              state: ProjectEntity,
              action: PayloadAction<ServerEntity>
            ) => {
              captured.push(action.payload);
            },
          },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export const AddNewServer: Story = {
  decorators: [
    (story) => <MockStore projectState={EmptyMockedState}>{story()}</MockStore>,
  ],
  play: async ({ canvasElement }) => {
    // GIVEN
    await resetArray(captured);
    await enterInputValue(canvasElement, "server-name", "SIT Server");
    await enterInputValue(canvasElement, "server-url", "https://sit.demo.com");

    // WHEN
    await clickButton(canvasElement, "save-btn");

    // THEN
    await assertAddServerDataSaved(captured);
    await assertAddServerFormIsReset(canvasElement);
    await assertElementIsVisible(canvasElement, "server-vars-component");
  },
};

import { Provider } from "react-redux";

import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { LicenseEntity } from "../../models/SwaggerModels";
import { Meta, StoryObj } from "@storybook/react";
import License from "../../components/License";
import { sleep } from "../common/Util";
import { MockStoreProps, MockedState } from "../common/SampleData";
import { assertInputValue } from "../common/AssertionsCatalogue";

const MockStore = ({ projectState, children }: MockStoreProps) => (
  <Provider
    store={configureStore({
      reducer: {
        project: createSlice({
          name: "project",
          initialState: projectState,
          reducers: {
            updateLicense: (state, action: PayloadAction<LicenseEntity>) => {
              state.info.license = action.payload;
            },
          },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

const meta: Meta<typeof License> = {
  title: "API Designer/Components/License",
  component: License,
  decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
  excludeStories: /.*MockedState$/,
};

export default meta;

type Story = StoryObj<typeof License>;

export const Default: Story = {
  decorators: [
    (story) => <MockStore projectState={MockedState}>{story()}</MockStore>,
  ],
  play: async ({ canvasElement }) => {
    await sleep(100);

    assertInputValue(canvasElement, "lic-name", "Apache");
    assertInputValue(canvasElement, "lic-url", "http://www.apache.org");
  },
};

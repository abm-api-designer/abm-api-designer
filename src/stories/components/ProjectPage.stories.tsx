import { Provider } from "react-redux";
import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { Meta, StoryObj } from "@storybook/react";
import ProjectPage from "../../components/ProjectPage";
import { expect, jest } from "@storybook/jest";
import {
  EmptyMockedState,
  MockStoreProps,
  MockedState,
} from "../common/SampleData";
import { sleep } from "../common/Util";
import {
  assertInputValue,
  assertTextAreaValue,
} from "../common/AssertionsCatalogue";
import { enterInputValue } from "../common/FormFiller";
import { LicenseEntity } from "../../models/SwaggerModels";
import { clickButton } from "../common/FormActions";
import { ProjectInfoPayload } from "../../data/payload/ProjectInfoPayload";
import assertProjectInfoPayload from "../common/ProjectAssertionsCatalogue";

const updateLicenseMock = jest.fn();
const updateProjectMock = jest.fn();

const MockStore = ({ projectState, children }: MockStoreProps) => (
  <Provider
    store={configureStore({
      reducer: {
        project: createSlice({
          name: "project",
          initialState: projectState,
          reducers: {
            updateLicense: (state, action: PayloadAction<LicenseEntity>) => {
              updateLicenseMock(state, action);
            },
            updateProject: (
              state,
              action: PayloadAction<ProjectInfoPayload>
            ) => {
              updateProjectMock(state, action);
            },
          },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

const meta: Meta<typeof ProjectPage> = {
  title: "API Designer/Components/ProjectPage",
  component: ProjectPage,
  excludeStories: /.*MockedState$/,
};

export default meta;

type Story = StoryObj<typeof ProjectPage>;

export const ShowingAlreadySavedData: Story = {
  decorators: [
    (story) => <MockStore projectState={MockedState}>{story()}</MockStore>,
  ],
  play: async ({ canvasElement }) => {
    // GIVEN
    await sleep(100);

    // WHEN
    assertInputValue(canvasElement, "project-title", "Clinic Management");
    assertTextAreaValue(
      canvasElement,
      "project-desc",
      "An app to automate the OPD"
    );
    assertInputValue(canvasElement, "project-version", "1.0.0");
    assertInputValue(
      canvasElement,
      "project-tos",
      "http://www.clinicmanagement.com/terms"
    );
    assertInputValue(
      canvasElement,
      "project-contact",
      "helpdesk@clinicmanagement.com"
    );
  },
};

export const SavingData: Story = {
  decorators: [
    (story) => <MockStore projectState={EmptyMockedState}>{story()}</MockStore>,
  ],
  play: async ({ canvasElement }) => {
    // GIVEN
    const projecTitle = "My first project";
    const projecDescription = "The demo project for testing storybook";
    const projecVersion = "1.2.1";
    const projecTos = "http://www.cman.com/terms";
    const projecContact = "helpdesk@cman.com";
    await sleep(100);

    // WHEN
    await enterInputValue(canvasElement, "project-title", projecTitle);
    await enterInputValue(canvasElement, "project-desc", projecDescription);
    await enterInputValue(canvasElement, "project-version", projecVersion);
    await enterInputValue(canvasElement, "project-tos", projecTos);
    await enterInputValue(canvasElement, "project-contact", projecContact);

    await clickButton(canvasElement, "save-btn");

    // THEN
    // TODO Need to find a way to assert the values here
    expect(updateProjectMock).toHaveBeenCalledTimes(1);
  },
};

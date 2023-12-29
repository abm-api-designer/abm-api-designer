import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  InfoEntity,
  LicenseEntity,
  ProjectEntity,
  ServerEntity,
  Tag,
} from "../../models/SwaggerModels";
import { ProjectInfoPayload } from "../payload/ProjectInfoPayload";

export const initialState: ProjectEntity = {
  openapi: "3.0.2",
  info: {
    title: "",
    description: "",
    version: "",
    termsOfService: "",
    contact: {
      email: "",
    },
    license: {
      name: "",
      url: "",
    },
  },
  externalDocs: {
    description: "",
    url: "",
  },
  tags: [] as Tag[],
  servers: [] as ServerEntity[],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    updateLicense: (state, action: PayloadAction<LicenseEntity>) => {
      state.info.license = action.payload;
    },
    updateProject: (
      state: ProjectEntity,
      action: PayloadAction<ProjectInfoPayload>
    ) => {
      const payload = action.payload;
      state.info.title = payload.title;
      state.info.description = payload.description;
      state.info.version = payload.version;
      state.info.termsOfService = payload.termsOfService;
      state.info.contact.email = payload.contactEmail;
    },
    addServer: (state: ProjectEntity, action: PayloadAction<ServerEntity>) => {
      state.servers.push(action.payload);
    },
  },
});

export const { updateLicense, updateProject, addServer } = projectSlice.actions;

export default projectSlice.reducer;

import {
  ExternalDocsEntity,
  ProjectEntity,
  ServerEntity,
  Tag,
} from "../../models/SwaggerModels";

export interface MockStoreProps {
  projectState: ProjectEntity;
  children: React.ReactNode;
}

export const MockedState: ProjectEntity = {
  openapi: "3.0.2",
  info: {
    title: "Clinic Management",
    description: "An app to automate the OPD",
    version: "1.0.0",
    termsOfService: "http://www.clinicmanagement.com/terms",
    contact: {
      email: "helpdesk@clinicmanagement.com",
    },
    license: {
      name: "Apache",
      url: "http://www.apache.org",
    },
  },
  externalDocs: {} as ExternalDocsEntity,
  tags: [] as Tag[],
  servers: [] as ServerEntity[],
};

export const ExistingVariablesMockedState: ProjectEntity = {
  ...MockedState,
  servers: [
    {
      description: "",
      url: "",
      variables: {
        port: {
          default: "80",
          description: "The running port of the server",
          enum: ["STRING"],
        },
      },
    },
  ],
};

export const EmptyMockedState: ProjectEntity = {
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
  externalDocs: {} as ExternalDocsEntity,
  tags: [] as Tag[],
  servers: [] as ServerEntity[],
};

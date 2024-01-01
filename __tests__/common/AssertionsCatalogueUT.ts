import { ServerVariableItem, Tag } from "../../src/models/SwaggerModels";

export const assertStringServerVariableItem = (actual: ServerVariableItem) => {
  const item = actual["hostname"];
  expect(item).toBeDefined();
  expect(item.description).toEqual("The server host");
  expect(item.default).toEqual("localhost");
  expect(item.enum).toBeUndefined();
};

export const assertEnumServerVariableItem = (actual: ServerVariableItem) => {
  const item = actual["port"];
  expect(item).toBeDefined();
  expect(item.description).toEqual("The server port");
  expect(item.default).toEqual("80");
  expect(item.enum).toEqual(["8080", "8443"]);
};

export const assertUpdatedTag = (actual: Tag) => {
  expect(actual.name).toEqual("pet");
  expect(actual.description).toEqual("Something new about pet");
  expect(actual.externalDocs.description).toEqual("Details");
  expect(actual.externalDocs.url).toEqual("https://www.tags.com");
};

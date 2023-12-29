import { ServerVariableItem } from "../../src/models/SwaggerModels";

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

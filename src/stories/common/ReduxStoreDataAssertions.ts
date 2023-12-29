import { expect } from "@storybook/jest";
import { ServerEntity } from "../../models/SwaggerModels";

export const assertAddServerDataSaved = async (captured: ServerEntity[]) => {
  await expect(captured.length).toEqual(1);
  await expect(captured[0].url).toEqual("https://sit.demo.com");
  await expect(captured[0].description).toEqual("SIT Server");
  await expect(Object.keys(captured[0].variables).length).toEqual(0);
};

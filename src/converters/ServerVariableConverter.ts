import {
  SimpleServerVariable,
  VariableType,
} from "../components/servers/ServerURLVariables";
import { ServerVariableItem } from "../models/SwaggerModels";

export const convertToServerVariableItems = (
  source: SimpleServerVariable[]
): ServerVariableItem => {
  const mapped: ServerVariableItem = {};
  source.forEach((item) => {
    mapped[item.name] = {
      default: item.default,
      description: item.description,
      enum: item.values?.toArray(),
    };
  });
  return mapped;
};

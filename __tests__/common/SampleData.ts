import {
  CsvString,
  SimpleServerVariable,
  VariableType,
} from "../../src/components/servers/ServerURLVariables";

export const getSimpleStringServerVariable = (): SimpleServerVariable[] => {
  return [
    {
      name: "hostname",
      type: VariableType.STRING,
      description: "The server host",
      default: "localhost",
    },
  ];
};

export const getSimpleEnumServerVariable = (): SimpleServerVariable[] => {
  return [
    {
      name: "port",
      type: VariableType.ENUM,
      description: "The server port",
      default: "80",
      values: new CsvString("8080,8443"),
    },
  ];
};

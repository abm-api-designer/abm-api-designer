import { SimpleServerVariable } from "../../src/components/servers/ServerURLVariables";
import {
  mapServerVariablesToDisplay,
  updateDefaultValue,
  updateSelectedVaribleType,
} from "../../src/mappers/ServerMapper";
import {
  ServerVariableItem,
  VariableType,
} from "../../src/models/SwaggerModels";

describe("ServerMapper:", () => {
  describe("updateSelectedVaribleType:", () => {
    it("should update the matching element at given index", () => {
      // GIVEN
      const index = 0;
      const value = "ENUM";
      const variables: SimpleServerVariable[] = [
        {
          default: "",
          description: "",
          name: "",
          type: VariableType.STRING,
        },
        {
          default: "",
          description: "",
          name: "",
          type: VariableType.STRING,
        },
      ];

      // WHEN
      const updated = updateSelectedVaribleType(variables, index, value);

      // THEN
      // Only the matching element should be updated
      expect(updated.length).toEqual(2);
      const actualElement = updated[index];
      expect(actualElement.type).toEqual(VariableType.ENUM);

      // Other elements should not be updated
      const anotherElement = updated[1];
      expect(anotherElement.type).toEqual(VariableType.STRING);
    });
  });

  describe("updateDefaultValue:", () => {
    const index = 0;

    let variables: SimpleServerVariable[];

    beforeEach(() => {
      variables = [
        {
          default: "",
          description: "",
          name: "",
          type: VariableType.STRING,
        },
        {
          default: "",
          description: "",
          name: "",
          type: VariableType.STRING,
        },
      ];
    });

    it("should update the matching element default field for given index if type is STRING", () => {
      // GIVEN
      const value = "8080";
      const type = VariableType.STRING;

      // WHEN
      const updated = updateDefaultValue(variables, index, type, value);

      // THEN
      // Only the matching element should be updated
      expect(updated.length).toEqual(2);
      const actualElement = updated[index];
      expect(actualElement.default).toEqual("8080");
      expect(actualElement.values).toBeUndefined();

      // Other elements should not be updated
      const anotherElement = updated[1];
      expect(anotherElement.default).toEqual("");
      expect(anotherElement.values).toBeUndefined();
    });

    it("should update the matching element values field for given index if type is ENUM", () => {
      // GIVEN
      const value = "localhost,sit";
      const type = VariableType.ENUM;

      // WHEN
      const updated = updateDefaultValue(variables, index, type, value);

      // THEN
      // Only the matching element should be updated
      expect(updated.length).toEqual(2);
      const actualElement = updated[index];
      expect(actualElement.default).toEqual("");
      expect(actualElement.values?.toArray()).toEqual(["localhost", "sit"]);

      // Other elements should not be updated
      const anotherElement = updated[1];
      expect(anotherElement.default).toEqual("");
      expect(anotherElement.values).toBeUndefined();
    });
  });

  describe("mapServerVariablesToDisplay:", () => {
    it("should map ServerEntity to SimpleServerVariable", () => {
      // GIVEN
      const serverVariableItem: ServerVariableItem = {
        hostname: {
          default: "localhost",
          description: "The hostname for the server to connect",
        },
        port: {
          default: "8080",
          description: "The port number to connect on",
          enum: ["8080", "8090"],
        },
      };

      // WHEN
      const actual = mapServerVariablesToDisplay(serverVariableItem);

      // THEN
      expect(actual.length).toEqual(2);
      const firstEle = actual[0];
      expect(firstEle.name).toEqual("hostname");
      expect(firstEle.description).toEqual(
        "The hostname for the server to connect"
      );
      expect(firstEle.type).toEqual(VariableType.STRING);
      expect(firstEle.values).toBeUndefined();

      const secondEle = actual[1];
      expect(secondEle.name).toEqual("port");
      expect(secondEle.description).toEqual("The port number to connect on");
      expect(secondEle.type).toEqual(VariableType.ENUM);
      expect(secondEle.values?.toArray()).toEqual(["8080", "8090"]);
    });
  });
});

import {
  getSimpleStringServerVariable,
  getSimpleEnumServerVariable,
} from "../common/SampleData";
import { convertToServerVariableItems } from "../../src/converters/ServerVariableConverter";
import {
  assertStringServerVariableItem,
  assertEnumServerVariableItem,
} from "../common/AssertionsCatalogueUT";

describe("ServerVariableConverter:", () => {
  describe("convertToServerVariableItems:", () => {
    it("should convert the given list of string variables to ServerVariableItem", () => {
      // GIVEN
      const source = getSimpleStringServerVariable();

      // WHEN
      const actual = convertToServerVariableItems(source);

      // THEN
      assertStringServerVariableItem(actual);
    });

    it("should convert the given list of enum variables to ServerVariableItem", () => {
      // GIVEN
      const source = getSimpleEnumServerVariable();

      // WHEN
      const actual = convertToServerVariableItems(source);

      // THEN
      assertEnumServerVariableItem(actual);
    });
  });
});

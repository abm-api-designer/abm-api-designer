import { parseUrl } from "../../src/utils/UrlParser";

describe("UrlParser:", () => {
  describe("parseUrl:", () => {
    it("should return the placeholders list", () => {
      // GIVEN
      const sampleUrl = "{protocol}://{hostname}:{port}/{basePath}/api";

      // WHEN
      const actual = parseUrl(sampleUrl);

      // THEN
      expect(actual.length).toEqual(4);
      expect(actual).toEqual(["protocol", "hostname", "port", "basePath"]);
    });
  });
});

import { addNew } from "../../src/mappers/TagMapper";
import { Tag } from "../../src/models/SwaggerModels";

describe("TagMapper:", () => {
  describe("addNew:", () => {
    it("should add a tag if not already exists", () => {
      // GIVEN
      const existingTags: Tag[] = [];
      const newTag: Tag = {
        name: "pet",
        description: "Everything about pet",
        externalDocs: {
          url: "https://www.tags.com",
          description: "More info",
        },
      };

      // WHEN
      addNew(existingTags, newTag);

      // THEN
      expect(existingTags.length).toEqual(1);
    });
  });
});

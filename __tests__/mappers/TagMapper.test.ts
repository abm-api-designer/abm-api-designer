import { addNew } from "../../src/mappers/TagMapper";
import { Tag } from "../../src/models/SwaggerModels";
import { assertUpdatedTag } from "../common/AssertionsCatalogueUT";

describe("TagMapper:", () => {
  describe("addNew:", () => {
    it("should add a tag with given name if not already added", () => {
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
      const updatedTags = addNew(existingTags, newTag);

      // THEN
      expect(updatedTags.length).toEqual(1);
    });

    it("should not add tag with same name if already added", () => {
      // GIVEN
      const existingTags: Tag[] = [
        {
          name: "pet",
          description: "Everything about pets",
          externalDocs: {
            description: "More info",
            url: "https://www.sample.com",
          },
        },
      ];
      const newTag: Tag = {
        name: "pet",
        description: "Something new about pet",
        externalDocs: {
          url: "https://www.tags.com",
          description: "Details",
        },
      };

      // WHEN
      const updatedTags = addNew(existingTags, newTag);

      // THEN
      expect(updatedTags.length).toEqual(1);
      const updatedTag = updatedTags[0];
      assertUpdatedTag(updatedTag);
    });
  });
});

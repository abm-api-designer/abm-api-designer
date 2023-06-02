import { Tag } from "../models/SwaggerModels";

function ifSameTag(currentTag: Tag, newTag: Tag) {
  return currentTag.name === newTag.name;
}
function updateCurrentIfMatchesGivenTag(current: Tag, givenTagToCompare: Tag) {
  if (ifSameTag(current, givenTagToCompare)) {
    return givenTagToCompare;
  }
  return current;
}
function tagExistsInArray(currentTags: Tag[], newTag: Tag) {
  return currentTags.findIndex((item) => ifSameTag(item, newTag)) !== -1;
}
function updateExisting(current: Tag[], newTag: Tag) {
  return current.map((item) => updateCurrentIfMatchesGivenTag(item, newTag));
}

export function addNew(currentTags: Tag[], newTag: Tag) {
  if (tagExistsInArray(currentTags, newTag)) {
    currentTags = updateExisting(currentTags, newTag);
  } else {
    currentTags.push(newTag);
  }
  return currentTags;
}

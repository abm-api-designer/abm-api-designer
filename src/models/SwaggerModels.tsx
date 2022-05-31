export interface Project {
  openapi: string;
  info: Info;
  externalDocs: ExternalDocs;
  servers: Server[];
  tags: Tag[];
}

export interface Info {
  title: string;
  description: string;
  termsOfService: string;
  contact: Contact;
  license: License;
  version: string;
}

export interface Contact {
  email: string;
}

export interface License {
  name: string;
  url: string;
}

export interface ExternalDocs {
  description: string;
  url: string;
}

export interface Server {
  url: string;
}

export interface Tag {
  name: string;
  description: string;
  externalDocs: ExternalDocs;
}

export interface Path {
  [url: string]: string;
}

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

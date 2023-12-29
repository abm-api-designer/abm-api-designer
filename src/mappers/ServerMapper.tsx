import { SimpleServerVariable } from "../components/servers/ServerURLVariables";
import { ServerEntity } from "../models/SwaggerModels";

function ifSameServer(currentItem: ServerEntity, newItem: ServerEntity) {
  return currentItem.description === newItem.description;
}
function updateCurrentIfMatchesGivenServer(
  currentItem: ServerEntity,
  givenItemToCompare: ServerEntity
) {
  if (ifSameServer(currentItem, givenItemToCompare)) {
    return givenItemToCompare;
  }
  return currentItem;
}
function serverExistsInArray(
  currentItems: ServerEntity[],
  newItem: ServerEntity
) {
  return currentItems.findIndex((item) => ifSameServer(item, newItem)) !== -1;
}
function updateExisting(current: ServerEntity[], newItem: ServerEntity) {
  return current.map((item) =>
    updateCurrentIfMatchesGivenServer(item, newItem)
  );
}

// TODO Deprecated
export function addNew(currentItems: ServerEntity[], newItem: ServerEntity) {
  if (serverExistsInArray(currentItems, newItem)) {
    currentItems = updateExisting(currentItems, newItem);
  } else {
    currentItems.push(newItem);
  }
  return currentItems;
}

export function convert(source: SimpleServerVariable) {
  const mappedVar = {
    default: source.default,
    description: source.description,
  };
  return {
    [source.name]: mappedVar,
  };
}

import { SimpleServerVariable } from "../components/ServersPage";
import { Server } from "../models/SwaggerModels";

function ifSameServer(currentItem: Server, newItem: Server) {
  return currentItem.description === newItem.description;
}
function updateCurrentIfMatchesGivenServer(
  currentItem: Server,
  givenItemToCompare: Server
) {
  if (ifSameServer(currentItem, givenItemToCompare)) {
    return givenItemToCompare;
  }
  return currentItem;
}
function serverExistsInArray(currentItems: Server[], newItem: Server) {
  return currentItems.findIndex((item) => ifSameServer(item, newItem)) !== -1;
}
function updateExisting(current: Server[], newItem: Server) {
  return current.map((item) =>
    updateCurrentIfMatchesGivenServer(item, newItem)
  );
}

// TODO Deprecated
export function addNew(currentItems: Server[], newItem: Server) {
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

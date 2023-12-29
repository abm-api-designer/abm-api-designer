import { SimpleServerVariable } from "../components/servers/ServerURLVariables";
import { ServerEntity } from "../models/SwaggerModels";

function updateMatchingItem(
  givenItem: SimpleServerVariable,
  fieldName: string,
  value: string
) {
  let updatedItem = {
    ...givenItem,
    [fieldName]: value,
  };
  return updatedItem;
}

export function findAndReplace(
  givenIndex: number,
  fieldName: string,
  value: string,
  variables: SimpleServerVariable[]
) {
  const updatedVariables = [];
  for (let currentIndex = 0; currentIndex < variables.length; currentIndex++) {
    let currentItem = variables[currentIndex];
    if (currentIndex === givenIndex) {
      currentItem = updateMatchingItem(currentItem, fieldName, value);
    }
    updatedVariables.push(currentItem);
  }
  return updatedVariables;
}

export function addServer(servers: ServerEntity[], newServer: ServerEntity) {
  return servers.map((item) =>
    item.description === newServer.description ? newServer : item
  );
}

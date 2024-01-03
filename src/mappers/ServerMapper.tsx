import {
  CsvString,
  SimpleServerVariable,
} from "../components/servers/ServerURLVariables";
import {
  ServerEntity,
  ServerVariableItem,
  VariableType,
  getVariableType,
} from "../models/SwaggerModels";

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

export function updateSelectedVaribleType(
  variables: SimpleServerVariable[],
  index: number,
  value: string
): SimpleServerVariable[] {
  const mappedVar = getVariableType(value);
  const updated: SimpleServerVariable[] = [];
  for (var i = 0; i < variables.length; i++) {
    const currentVar = variables[i];
    if (i === index) {
      if (mappedVar) {
        currentVar.type = mappedVar;
      }
    }
    updated.push(currentVar);
  }
  return updated;
}

export function mapServerVariablesToDisplay(variables: ServerVariableItem) {
  var mappedVars = [] as SimpleServerVariable[];
  Object.keys(variables).forEach((key) => {
    let csvStringVal = undefined;
    const item = variables[key];
    const enumValues = item.enum;
    let defaultValue: string = item.default;
    if (enumValues !== undefined) {
      const csvDisplay = enumValues.join(",");
      csvStringVal = new CsvString(csvDisplay);
      defaultValue = csvDisplay;
    }

    mappedVars.push({
      default: defaultValue,
      name: key,
      type: item.enum === undefined ? VariableType.STRING : VariableType.ENUM,
      description: item.description,
      values: csvStringVal,
    });
  });
  return mappedVars;
}

export function updateNameForVariable(
  variables: SimpleServerVariable[],
  index: number,
  value: string
): SimpleServerVariable[] {
  const updated: SimpleServerVariable[] = [];
  variables.forEach((currentValue, currentIndex) => {
    if (currentIndex === index) {
      currentValue.name = value;
    }
    updated.push(currentValue);
  });
  return updated;
}

export function updateDefaultValue(
  variables: SimpleServerVariable[],
  index: number,
  type: VariableType,
  value: string
) {
  const mappedVar = getVariableType(type);
  const updated: SimpleServerVariable[] = [];
  for (var i = 0; i < variables.length; i++) {
    const currentVar = variables[i];
    if (i === index && mappedVar) {
      switch (mappedVar) {
        case VariableType.ENUM:
          const csvStr = new CsvString(value);
          currentVar.values = csvStr;
          currentVar.default = csvStr.toArray()[0];
          break;
        case VariableType.STRING:
          currentVar.default = value;
          break;
      }
    }
    updated.push(currentVar);
  }
  return updated;
}

export function deleteVariable(
  variables: SimpleServerVariable[],
  index: number
) {
  const updated: SimpleServerVariable[] = [];
  for (let i = 0; i < variables.length; i++) {
    if (i !== index) {
      const currentItem = variables[i];
      updated.push(currentItem);
    }
  }
  return updated;
}

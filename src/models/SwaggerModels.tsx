export interface ProjectEntity {
  openapi: string;
  info: InfoEntity;
  externalDocs: ExternalDocsEntity;
  servers: ServerEntity[];
  tags: Tag[];
}

export interface InfoEntity {
  title: string;
  description: string;
  termsOfService: string;
  contact: Contact;
  license: LicenseEntity;
  version: string;
}

export interface Contact {
  email: string;
}

export interface LicenseEntity {
  name: string;
  url: string;
}

export interface ExternalDocsEntity {
  description: string;
  url: string;
}

export interface ServerEntity {
  description: string;
  url: string;
  variables: ServerVariableItem;
}

export interface ServerVariableItem {
  [name: string]: ServerVariable;
}

export interface ServerVariable {
  enum?: string[];
  default: string;
  description: string;
}

export interface Tag {
  name: string;
  description: string;
  externalDocs: ExternalDocsEntity;
}

export interface Path {
  [url: string]: string;
}

export enum VariableType {
  ENUM = "ENUM",
  STRING = "STRING",
}

export function getVariableType(value: string): VariableType | undefined {
  switch (value) {
    case "ENUM":
      return VariableType.ENUM;
    case "STRING":
      return VariableType.STRING;
    default:
      return undefined;
  }
}

export function getVariableTypeFromIndex(
  index: number
): VariableType | undefined {
  const enumValues: VariableType[] = Object.values(
    VariableType
  ) as VariableType[];
  if (index > 0 && index < enumValues.length) {
    return enumValues[index];
  }
  return undefined;
}

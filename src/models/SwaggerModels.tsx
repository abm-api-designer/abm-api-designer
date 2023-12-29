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

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
  description: string;
  url: string;
  variables: ServerVariableItem;
}

export interface ServerVariableItem {
  [name: string]: ServerVariable;
}

export interface ServerVariable {
  enum: string[];
  default: string;
  description: string;
}

export interface Tag {
  name: string;
  description: string;
  externalDocs: ExternalDocs;
}

export interface Path {
  [url: string]: string;
}

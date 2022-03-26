class Project {

  constructor() {
    this.openapi = '3.0.2'
    this.info = {}
    this.paths = {}
    this.tags = []
    this.servers = []
    this.components = {
      schemas: {},
      requestBodies: {},
      responses: {},
      parameters: []
    }

  }

}

class DataConverter {

  toSpec(project) {
    return project;
  }

}

export { Project, DataConverter }

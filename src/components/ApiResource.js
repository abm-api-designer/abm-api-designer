import React from 'react'
import './api-resource.css'
import CustomTooltip from './CustomTooltip'

const initialState = {
  method: '',
  url: '',
  operationId: '',
  summary: '',
  description: '',
  tag: '',
  requestBody: '',
  responseBody: '',
  pathParam: '',
  isEditing: false
}

class ApiResource extends React.Component {

  constructor(props) {
    super(props)
    this.state = initialState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetState = this.resetState.bind(this)
    this.addPathMethod = this.addPathMethod.bind(this)
    this.handleOnEdit = this.handleOnEdit.bind(this)
    this.findComponentReferenceId = this.findComponentReferenceId.bind(this)
    this.findPathBy = this.findPathBy.bind(this)
    this.populatePathToRender = this.populatePathToRender.bind(this)
    this.updatePathMethod = this.updatePathMethod.bind(this)
  }

  handleChange(event) {
    const target = event.target;
    const fieldName = target.name;
    const fieldValue = target.value;
    this.setState({
      [fieldName]: fieldValue
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const newProject = this.props.project
    if (this.state.isEditing === true) {
      this.updatePathMethod(newProject)
    } else {
      this.addPathMethod(newProject)
    }

    this.props.onChange(newProject)
    this.resetState()
  }

  addPathMethod(project) {
    if (project.paths[this.state.url] === undefined) {
      project.paths[this.state.url] = {}
    }
    project.paths[this.state.url][this.state.method] = {
      operationId: this.state.operationId,
      summary: this.state.summary,
      description: this.state.description,
      tags: [this.state.tag]
    }

    this.addRequestBody(project);
    this.addResponseBody(project);
    this.addPathParam(project);
  }

  updatePathMethod(project) {
    const foundPath = this.getPathObjectFromProject(project);
    if (foundPath !== undefined) {
      foundPath.operationId = this.state.operationId;
      foundPath.summary = this.state.summary;
      foundPath.description = this.state.description;
      foundPath.tags = [this.state.tag]

      this.addRequestBody(project);
      this.addResponseBody(project);
      this.addPathParam(project);
    }
  }

  findPathBy(summary) {
    const projectPaths = this.props.project.paths;
    const pathUrls = Object.keys(projectPaths);
    for (var pathUrl of pathUrls) {
      const pathMethods = Object.keys(projectPaths[pathUrl]);
      for (var methodName of pathMethods) {
        const currentPath = projectPaths[pathUrl][methodName]
        const currentPathSummary = currentPath.summary;
        if (currentPathSummary === summary) {
          this.populatePathToRender(pathUrl, methodName, currentPath)
          break;
        }
      }
    }
  }

  getSuccessResponseBody(currentPath) {
    return currentPath.responses === undefined ? "" : currentPath.responses[200];
  }

  populatePathToRender(pathUrl, methodName, currentPath) {
    const requestBodyId = this.findComponentReferenceId(currentPath.requestBody);
    const responseBodyLink = this.getSuccessResponseBody(currentPath);
    const responseBodyId = this.findComponentReferenceId(responseBodyLink);
    this.setState({
      method: methodName,
      url: pathUrl,
      operationId: currentPath.operationId,
      summary: currentPath.summary,
      description: currentPath.description,
      tag: currentPath.tags[0],
      requestBody: requestBodyId,
      responseBody: responseBodyId,
      pathParam: "",
      isEditing: true
    })
  }

  handleOnEdit(pathSummary) {
    this.findPathBy(pathSummary);
  }

  findPathParamIds(pathParams) {
    const foundParams = [];
    for (var paramLink of pathParams) {
      foundParams.push(
        this.findComponentReferenceId(paramLink)
      )
    }
    return foundParams;
  }

  findComponentReferenceId(refLink) {
    if (this.isNotEmpty(refLink)) {
      const fullLink = refLink['$ref'];
      return fullLink.split('/')[3];
    }
    return "";
  }

  addRequestBody(project) {
    if (this.isNotEmpty(this.state.requestBody) && this.isSelected(this.state.requestBody)) {
      this.getPathObjectFromProject(project).requestBody = {
        $ref: `#/components/requestBodies/${this.state.requestBody}`
      }
    }
  }

  isSelected(value) {
    return value !== "Select";
  }

  addResponseBody(project) {
    if (this.isNotEmpty(this.state.responseBody) && this.isSelected(this.state.responseBody)) {
      this.getPathObjectFromProject(project).responses = {
        '200': {
          $ref: `#/components/responses/${this.state.responseBody}`
        }
      }
    }
  }

  getPathObjectFromProject(project) {
    return project.paths[this.state.url][this.state.method];
  }

  isNotEmpty(value) {
    return value !== undefined && value !== "";
  }

  addPathParam(project) {
    if (this.isNotEmpty(this.state.pathParam)) {
      this.getPathObjectFromProject(project).parameters = []
      this.getPathObjectFromProject(project).parameters.push({
        $ref: `#/components/parameters/${this.state.pathParam}`
      })
    }
  }

  resetState() {
    this.setState(initialState)
  }

  render() {
    const components = this.props.project.components
    const existingTags = this.props.project.tags
    const tagsList = existingTags === undefined ? [] : existingTags.map(tag =>
      <option key={tag.name} value={tag.name}>{tag.name}</option>
    )
    const requestBodies = this.props.project.components.requestBodies
    const localRequestBodies = []
    for (var item in requestBodies) {
      localRequestBodies.push(item)
    }
    const requestBodiesDisplay = localRequestBodies.map((item, index) =>
      <option key={item + '-' + index} value={item}>{item}</option>
    )

    const localResponseBodies = []
    for (var bodyName in components.responses) {
      localResponseBodies.push(bodyName)
    }

    const responseBodiesDisplay = localResponseBodies.map((item, index) =>
      <option key={index} value={item}>{item}</option>
    )

    const localParams = []
    for (var param in components.parameters) {
      localParams.push(param)
    }

    const pathParamsDisplay = localParams.map((item, index) =>
      <option key={index} value={item}>{item}</option>
    )

    const existingPaths = [];
    const projectPaths = this.props.project.paths;
    const pathUrls = Object.keys(projectPaths);
    for (var pathUrl of pathUrls) {
      const pathMethods = Object.keys(projectPaths[pathUrl]);
      for (var methodName of pathMethods) {
        // const clubbedPath = `${pathUrl} - ${methodName}`;
        const pathDetails = projectPaths[pathUrl][methodName].summary;
        existingPaths.push(
          <button key={pathDetails} onClick={() => this.handleOnEdit(pathDetails)} type="button" className="btn btn-outline-primary">{pathDetails}</button>
        );
      }
    }

    return (
      <div>
        <h4 className="page-title">Add an API Resource</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="row mb-3">
            <div className="col-5">
              <label htmlFor="selectHttpMethod" className="form-label">HttpMethod</label>
              <select required name="method" value={this.state.method} onChange={this.handleChange} id="selectHttpMethod" className="form-select" aria-label="Server variable type">
                <option>Select</option>
                <option value="post">POST</option>
                <option value="get">GET</option>
                <option value="put">PUT</option>
                <option value="delete">DELETE</option>
              </select>
            </div>
            <div className="col-5 offset-2">
              <label htmlFor="selectPetTag" className="form-label">
                Attach a Tag
              </label>
              <select required name="tag" value={this.state.tag} onChange={this.handleChange} id="selectPetTag" className="form-select" aria-label="Server variable type">
                <option>Select</option>
                {tagsList}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="apiUrl" className="form-label">
              Endpoint URL
            </label>
            <CustomTooltip text="The value should follow rest api design guidelines" />
            <input required name="url" value={this.state.url} onChange={this.handleChange} id="apiUrl" className="form-control" placeholder="Ex: /pet" />
          </div>
          <div className="row mb-2">
            <div className="form-floating col-8 row-margin">
              <input name="summary" value={this.state.summary} onChange={this.handleChange} id="apiSummary" className="form-control" placeholder="Ex: Add a new pet" />
              <label htmlFor="apiSummary" className="form-label custom-floating-label">Summary</label>
            </div>
            <div className="form-floating col-4 row-margin">
              <input required name="operationId" value={this.state.operationId} onChange={this.handleChange} id="operationId" className="form-control" placeholder="Ex: addPet" />
              <label htmlFor="operationId" className="form-label custom-floating-label">OperationId</label>
            </div>
          </div>
          <div className="row mb-2">
            <div className="form-floating col-8">
              <textarea name="description" value={this.state.description} onChange={this.handleChange} className="form-control" style={{ height: '80px' }} placeholder="Ex: This is a sample server Petstore server" id="projectDescription"></textarea>
              <label htmlFor="projectDescription" className="form-label custom-floating-label">Description</label>
            </div>
            <div className="col-4">
              <label htmlFor="pathParam" className="form-label">Path Param</label>
              <select name="pathParam" value={this.state.pathParam} onChange={this.handleChange} id="pathParam" className="form-select" aria-label="Path Parameter">
                <option>Select</option>
                {pathParamsDisplay}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-5 offset-1 mb-2">
              <label htmlFor="selectTag" className="form-label">Request Body</label>
              <select name="requestBody" value={this.state.requestBody} onChange={this.handleChange} id="selectTag" className="form-select" aria-label="Server variable type">
                <option>Select</option>
                {requestBodiesDisplay}
              </select>
            </div>
            <div className="col-5 mb-2">
              <label htmlFor="selectResponseBody" className="form-label">Response Body</label>
              <select required name="responseBody" value={this.state.responseBody} onChange={this.handleChange} id="selectResponseBody" className="form-select" aria-label="Response Body">
                <option>Select</option>
                {responseBodiesDisplay}
              </select>
            </div>
          </div>
          <div align="center">
            {this.state.isEditing ?
              <button type="submit" className="btn btn-dark">SAVE</button> :
              <button type="submit" className="btn btn-dark">ADD</button>
            }
          </div>
        </form>

        <h5>Existing Paths</h5>
        <div className="existing mb-3">
          {existingPaths}
        </div>

      </div>
    )
  }

}

export default ApiResource

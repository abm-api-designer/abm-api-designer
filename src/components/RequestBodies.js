import React from 'react';

class RequestBodies extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      contentType: '',
      schemaName: '',
      isEditing: false
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.handleOnEdit = this.handleOnEdit.bind(this)
    this.resetState = this.resetState.bind(this)

  }

  handleOnChange(event) {
    const target = event.target
    const fieldName = target.name
    const fieldValue = target.value
    this.setState({
      [fieldName]: fieldValue
    })
  }

  handleOnSubmit(event) {
    event.preventDefault()
    const updatedProject = this.props.project
    const requestBodies = updatedProject.components.requestBodies
    const foundRequestBody = requestBodies[this.state.name]
    if (foundRequestBody === undefined) {
      this.createNew(requestBodies, updatedProject)
    } else {
      // TODO Need to work on this update scenario
      this.updateExisting(foundRequestBody)
    }
    this.props.onChange(updatedProject)
    this.resetState()
  }

  createNew(requestBodies, updatedProject) {
    requestBodies[this.state.name] = {
      description: this.state.description,
      content: {}
    }
    requestBodies[this.state.name].content[this.state.contentType] = {
      schema: {
        $ref: `#/components/schemas/${this.state.schemaName}`
      }
    }
  }

  handleOnEdit(reqBodyName) {
    const bodies = this.props.project.components.requestBodies
    const foundRequestBody = bodies[reqBodyName]
    const contentType = Object.keys(foundRequestBody.content)[0]
    const schemaName = foundRequestBody.content[contentType].schema['$ref'].split('#/components/schemas/')[1]
    this.setState({
      name: reqBodyName,
      description: foundRequestBody.description,
      contentType: contentType,
      schemaName: schemaName,
      isEditing: true
    })
  }

  resetState() {
    this.setState({
      name: '',
      description: '',
      contentType: '',
      schemaName: ''
    })
  }

  render() {
    const components = this.props.project.components
    const projectSchemas = components.schemas
    const localSchemas = []
    for (var schemaName in projectSchemas) {
      localSchemas.push(schemaName)
    }
    const schemaDisplayList = localSchemas.map((item, index) =>
      <option key={index} value={item}>{item}</option>
    )

    const localRequestBodies = []
    for (var item in components.requestBodies) {
      localRequestBodies.push(item)
    }
    const displayReqBodies = localRequestBodies.map((item, index) =>
      <button key={index} onClick={() => this.handleOnEdit(item)} type="button" className="btn btn-outline-primary">{item}</button>
    )

    return (
      <div>
        <h4 className="page-title">Define Request Bodies</h4>
        <form onSubmit={this.handleOnSubmit}>
          <div className="row mb-2">
            <div className="form-floating col-4">
              <input name="name" value={this.state.name} onChange={this.handleOnChange} id="tagName" className="form-control" placeholder="Ex: Pet" />
              <label htmlFor="tagName" className="custom-floating-label">Name</label>
            </div>
            <div className="form-floating col-8">
              <input name="description" value={this.state.description} onChange={this.handleOnChange} id="tagDescription" className="form-control" placeholder="Ex: Everything about your Pets" />
              <label htmlFor="tagDescription" className="custom-floating-label">Description</label>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-7">
              <label htmlFor="selectTag" className="form-label">ContentType</label>
              <select name="contentType" value={this.state.contentType} onChange={this.handleOnChange} id="selectTag" className="form-select" aria-label="Server variable type">
                <option>Select</option>
                <option value="application/json">application/json</option>
                <option value="text/plain; charset=utf-8">text/plain; charset=utf-8</option>
                <option value="application/xml">application/xml</option>
              </select>
            </div>
            <div className="col-5">
              <label htmlFor="selectTag" className="form-label">Schema Model</label>
              <select name="schemaName" value={this.state.schemaName} onChange={this.handleOnChange} id="selectTag" className="form-select" aria-label="Server variable type">
                <option>Select</option>
                {schemaDisplayList}
              </select>
            </div>
          </div>
          <div align="center">
            <button type="submit" className="btn btn-dark">SAVE</button>
          </div>
        </form>

        <h5>Existing Request Bodies</h5>
        <div className="existing mb-3">
          {displayReqBodies}
        </div>

      </div>
    )
  }

}

export default RequestBodies;

import React from 'react'
import './parameters.css'

class Parameters extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      location: '',
      description: '',
      required: false,
      deprecated: false,
      allowedEmpty: false,
      schemaType: '',
      schemaFormat: '',
      schemaEnum: '',
      editing: false
    }

    this.resetState = this.resetState.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnEdit = this.handleOnEdit.bind(this)
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
    const project = this.props.project
    if (project.components.parameters === undefined) {
      project.components.parameters = {}
    }
    const parameters = project.components.parameters
    const foundParameters = parameters[this.state.name]
    if (foundParameters === undefined) {
      this.createNew(parameters)
    } else {
      this.updateExisting()
    }
    this.props.onChange(project)
    this.resetState()
  }

  handleOnEdit(paramName) {
    const foundParam = this.props.project.components.parameters[paramName]
    this.setState({
      editing: true,
      name: foundParam.name,
      location: foundParam.in,
      description: foundParam.description,
      required: foundParam.required,
      deprecated: foundParam.deprecated,
      allowedEmpty: foundParam.allowEmptyValue,
      schemaType: foundParam.schema.type,
      schemaFormat: foundParam.schema.format,
      schemaEnum: foundParam.schema.enum,
    })
  }

  createNew(parameters) {
    parameters[this.state.name] = {
      name: this.state.name,
      in: this.state.location,
      required: this.state.required,
      deprecated: this.state.deprecated,
      description: this.state.description,
      schema: {
        type: this.state.schemaType,
        format: this.state.schemaFormat,
        enum: this.getEnumValues()
      }
    }
  }

  getEnumValues() {
    return this.state.schemaEnum === undefined || this.state.schemaEnum === "" ? [] : this.state.schemaEnum.split(',')
  }

  updateExisting() {

  }

  resetState() {
    this.setState({
      name: '',
      location: '',
      description: '',
      required: false,
      deprecated: false,
      allowedEmpty: false,
      schemaType: '',
      schemaFormat: '',
      schemaEnum: '',
      editing: false
    })
  }

  render() {
    const projectParams = this.props.project.components.parameters
    let existingParameters = ''
    if (projectParams !== undefined) {
      const params = Object.keys(projectParams)
      existingParameters = params.map((param, index) =>
        <button key={param + '-' + index} onClick={() => this.handleOnEdit(param)} type="button" className="btn btn-outline-primary">{param}</button>
      )
    }

    return (
      <div>
        <h4 className="page-title">Create Parameter</h4>

        <form onSubmit={this.handleOnSubmit}>

          <div className="row mb-3">
            <div id="paramPanel" className="col-8">
              <h5 className="panel-title">Param Definition</h5>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="paramLocation" className="form-label">Location</label>
                  <select name="location" value={this.state.location}
                    onChange={this.handleOnChange} id="paramLocation"
                    className="form-select" aria-label="Param Location">
                    <option>Select</option>
                    <option value="path">Path</option>
                    <option value="query">Query</option>
                    <option value="header">Header</option>
                    <option value="cookie">Cookie</option>
                  </select>
                </div>
                <div className="col-6">
                  <label htmlFor="paramName" className="form-label">Name</label>
                  <input value={this.state.name} onChange={this.handleOnChange} name="name" id="paramName" className="form-control" placeholder="Ex: Id" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="paramDesc" className="form-label">Description</label>
                  <input value={this.state.description} onChange={this.handleOnChange} name="description" id="paramDesc" className="form-control" placeholder="Ex: Identifier of Pet" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-3">
                  <label htmlFor="isRequired" className="form-label">Required</label><br />
                  <input value={this.state.required} checked={this.state.required} onChange={this.handleOnChange} name="required" className="form-check-input" type="checkbox" id="isRequired" />
                </div>
                <div className="col-4">
                  <label htmlFor="isDeprecated" className="form-label">Deprecated</label><br />
                  <input value={this.state.deprecated} checked={this.state.deprecated} onChange={this.handleOnChange} name="deprecated" className="form-check-input" type="checkbox" id="isDeprecated" />
                </div>
                <div className="col-5">
                  <label htmlFor="isEmptyValueAllowed" className="form-label">Empty Allowed</label><br />
                  <input value={this.state.allowedEmpty} checked={this.state.allowedEmpty} onChange={this.handleOnChange} name="allowedEmpty" className="form-check-input" type="checkbox" id="isEmptyValueAllowed" />
                </div>
              </div>
            </div>
            <div id="schemaPanel" className="col-3">
              <h5 className="panel-title">Schema</h5>
              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="fieldType" className="form-label">Type</label>
                  <select value={this.state.schemaType} name="schemaType" onChange={this.handleOnChange} id="fieldType" className="form-select" aria-label="Param Type">
                    <option>Select</option>
                    <option value="string">String</option>
                    <option value="integer">Integer</option>
                    <option value="number">Number</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="fieldFormat" className="form-label">Format</label>
                  <select value={this.state.schemaFormat} onChange={this.handleOnChange} name="schemaFormat" id="fieldFormat" className="form-select" aria-label="Param Format">
                    <option>Select</option>
                    <option value="int32">Int32</option>
                    <option value="int64">Int64</option>
                    <option value="date">Date</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="enumValues" className="form-label">Enum</label>
                  <input value={this.state.schemaEnum} onChange={this.handleOnChange} name="schemaEnum" id="enumValues" className="form-control" placeholder="Ex: Dog,Cat" />
                </div>
              </div>
            </div>
          </div>

          <div align="center">
            <button type="clear" className="btn btn-dark button-margin-right">CLEAR</button>
            {this.state.editing === true ?
              <button type="submit" className="btn btn-dark">SAVE</button> :
              <button type="submit" className="btn btn-dark">ADD</button>}
          </div>

        </form>

        <h5>Existing Parameters</h5>
        <div className="existing mb-3">
          {existingParameters}
        </div>

      </div>
    )
  }

}

export default Parameters

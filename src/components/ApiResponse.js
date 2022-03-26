import React from 'react'

class ApiResponse extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      name: '',
      description: '',
      contentType: '',
      schemaName: '',
      schemaType: ''
    }

    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnEdit = this.handleOnEdit.bind(this)
    this.resetState = this.resetState.bind(this)
  }

  handleOnChange(event){
    const target = event.target
    const fieldName = target.name
    const fieldValue = target.value
    this.setState({
      [fieldName] : fieldValue
    })
  }

  handleOnSubmit(event){
    event.preventDefault()
    const project = this.props.project
    const responses = project.components.responses
    const foundResponse = responses[this.state.name]
    if(foundResponse === undefined){
      this.createNew(responses)
    } else {
      this.updateExisting(foundResponse)
    }
    this.props.onChange(project)
    this.resetState()
  }

  createNew(responses){
    responses[this.state.name] = {
      description: this.state.description,
      content: {}
    }
    responses[this.state.name].content[this.state.contentType] = {
      schema: this.getSchemaObject()
    }
  }

  updateExisting(foundResponse){
    console.log("Updating...");
  }

  getSchemaObject(){
    var schemaObj = {
      $ref: `#/components/schemas/${this.state.schemaName}`
    }
    if(this.state.schemaType === 'array'){
      schemaObj = {
        type: 'array',
        items: {
          $ref: `#/components/schemas/${this.state.schemaName}`
        }
      }
    }
    return schemaObj
  }

  handleOnEdit(responseName){
    console.log("Editing... ");
  }

  resetState(){
    this.setState({
      name: '',
      description: '',
      contentType: '',
      schemaName: '',
      schemaType: ''
    })
  }

  render(){
    const components = this.props.project.components
    const projectSchemas = components.schemas
    const localSchemas = []
    for(var schemaName in projectSchemas){
      localSchemas.push(schemaName)
    }
    const schemaDisplayList = localSchemas.map((item,index) =>
      <option key={index} value={item}>{item}</option>
    )

    const localResponses = []
    for(var item in components.responses){
      localResponses.push(item)
    }
    const displayResponses = localResponses.map((item,index)=>
      <button key={index} onClick={()=>this.handleOnEdit(item)} type="button" className="btn btn-outline-primary">{item}</button>
    )

    return(
      <div>
        <h4 className="page-title">Build API Response</h4>
        <form onSubmit={this.handleOnSubmit}>
          <div className="row mb-2">
            <div className="form-floating col-4">
              <input name="name" value={this.state.name} onChange={this.handleOnChange} id="responseBodyName" className="form-control" placeholder="Ex: GetAllPets" />
              <label htmlFor="responseBodyName" className="custom-floating-label">Name</label>
            </div>
            <div className="form-floating col-8">
              <input name="description" value={this.state.description} onChange={this.handleOnChange} id="responseBodyDescription" className="form-control" placeholder="Ex: Fetch All Pets" />
              <label htmlFor="responseBodyDescription" className="custom-floating-label">Description</label>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-7">
              <label htmlFor="selectContentType" className="form-label">ContentType</label>
              <select name="contentType" value={this.state.contentType} onChange={this.handleOnChange} id="selectContentType" className="form-select" aria-label="Response Content Type">
                <option>Select</option>
                <option value="application/json">application/json</option>
                <option value="text/plain; charset=utf-8">text/plain; charset=utf-8</option>
                <option value="application/xml">application/xml</option>
              </select>
            </div>
            <div className="col-5">
              <label htmlFor="schemaSelection" className="form-label">Schema</label>
              <select name="schemaName" value={this.state.schemaName} onChange={this.handleOnChange} id="schemaSelection" className="form-select" aria-label="Response Schema">
                <option>Select</option>
                {schemaDisplayList}
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-5">
              <label htmlFor="schemaType" className="form-label">Schema Type</label>
              <select name="schemaType" value={this.state.schemaType} onChange={this.handleOnChange} id="schemaType" className="form-select" aria-label="Response Schema Type">
                <option>Select</option>
                <option value="object">Object</option>
                <option value="array">Array</option>
              </select>
            </div>
          </div>
          <div align="center">
            <button type="submit" className="btn btn-dark">SAVE</button>
          </div>
        </form>

        <h5>Existing API Responses</h5>
        <div className="existing mb-3">
          {displayResponses}
        </div>

      </div>
    )
  }

}

export default ApiResponse

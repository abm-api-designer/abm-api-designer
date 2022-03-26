import React from 'react'

const initialState = {
  description: '',
  url: '',
  variables: [],
  isEditing: false
}

class ServerInfo extends React.Component {

  constructor(props){
    super(props)
    this.state = initialState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.resetState = this.resetState.bind(this)

    this.handleAddNewVariableRow = this.handleAddNewVariableRow.bind(this)
    this.handleRemoveRow = this.handleRemoveRow.bind(this)
    this.handleVariableChange = this.handleVariableChange.bind(this)
    this.addNewServerVariable = this.addNewServerVariable.bind(this)
    this.handleOnEdit = this.handleOnEdit.bind(this)

  }

  handleChange(event){
    const target = event.target
    const fieldName = target.name
    const fieldValue = target.value
    this.setState({
      [fieldName] : fieldValue
    })
  }

  handleOnEdit(index){
    const foundServer = this.props.project.servers[index]
    this.setState({
      description: foundServer.description,
      url: foundServer.url,
      variables: this.variablesToUI(foundServer.variables),
      isEditing: true
    })
  }

  variablesToUI(inMemoryRepOfVars){
    const variables = []
    if(inMemoryRepOfVars === undefined){
      return variables
    }
    const keys = Object.keys(inMemoryRepOfVars)
    keys.forEach((item, i) => {
      const serverVar = inMemoryRepOfVars[item]
      const newVar = {
        name: item,
        default: serverVar.default,
        type: serverVar.enum === undefined ? 'text' : 'enum'
      }
      if(serverVar.enum !== undefined){
        newVar['enumValues'] = serverVar.enum.join(',')
      }
      variables.push(newVar)
    });
    return variables;
  }

  handleVariableChange(event,index){
    const target = event.target
    const fieldName = target.name
    const fieldValue = target.value
    const newVariables = this.state.variables
    newVariables[index][fieldName] = fieldValue
    this.setState({
      variables: newVariables
    })
  }

  resetState(){
    initialState.variables = []
    this.setState(initialState)
  }

  handleSubmit(event){
    event.preventDefault()
    const foundProject = this.props.project
    if(this.state.isEditing === true){
      this.updateExisting(foundProject)
    } else {
      this.createNew(foundProject)
    }
    this.props.onChange(foundProject)
    this.resetState()
  }

  createNew(project){
    const newServer = {
      description: this.state.description,
      url: this.state.url,
      variables: {}
    }
    this.state.variables.forEach(currVar => {
      this.addNewServerVariable(newServer, currVar)
    })
    project.servers.push(newServer)
  }

  updateExisting(project){
    const foundServer = project.servers.find(item => item.description === this.state.description)
    foundServer.url = this.state.url
    foundServer.variables = {}
    this.state.variables.forEach(currVar => {
      this.addNewServerVariable(foundServer, currVar)
    })
  }

  addNewServerVariable(server,serverVariable){
    const serverVarDetails = {}
    server.variables[serverVariable.name] = serverVarDetails
    serverVarDetails['default'] = serverVariable.default
    if(serverVariable.type === 'enum'){
        serverVarDetails['enum'] = serverVariable.enumValues.split(',')
    }
  }

  handleAddNewVariableRow(){
    const existingVars = this.state.variables
    const defaultServerVar = {}
    existingVars.push(defaultServerVar)
    this.setState({
      variables: existingVars
    })
  }

  handleRemoveRow(toRemoveIndex){
    const filteredVars = this.state.variables.filter((val,index)=> index !== toRemoveIndex)
    this.setState({
      variables: filteredVars
    })
  }

  render(){
    var enumValueHeader
    const uriVariables = this.state.variables.map((uriVar,index) =>{
      if(uriVar.type === 'enum'){
        enumValueHeader = <th>Values</th>
      }

      return <tr key={index}>
        <td>
          <input key={index} value={uriVar.name} onChange={(e)=>this.handleVariableChange(e,index)} required name="name" className="form-control" placeholder="Ex: Username" />
        </td>
        <td style={{width:'25%'}}>
          <select key={index} value={uriVar.type} onChange={(e)=>this.handleVariableChange(e,index)} name="type" required className="form-select" aria-label="Server variable type">
            <option>Select</option>
            <option value="text">Text</option>
            <option value="enum">Enum</option>
          </select>
        </td>
        {uriVar.type === 'enum' &&
          <td>
            <input key={index} value={uriVar.enumValues} onChange={(e)=>this.handleVariableChange(e,index)} name="enumValues" id="enumValuesInput" className="form-control" placeholder="8081,8082" />
          </td>
        }
        <td>
          <input key={index} value={uriVar.default} onChange={(e)=>this.handleVariableChange(e,index)} name="default" className="form-control" placeholder="Ex: demo" />
        </td>
        <td>
          <i style={{marginLeft:'1%'}} onClick={()=>this.handleRemoveRow(index)} className="bi bi-dash-circle-fill text-danger"></i>
        </td>
      </tr>

    })

    const existingServers = this.props.project.servers.map((existingServer,index) =>
      <button onClick={()=>this.handleOnEdit(index)} type="button" className="btn btn-outline-primary">{existingServer.description}</button>
    )

    return(
      <div>
        <h4 className="page-title">Add Server</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-5">
              <label htmlFor="serverDesc" className="form-label">Description</label>
              <input value={this.state.description} required id="serverDesc" name="description" onChange={this.handleChange} className="form-control" placeholder="Ex: Developent" />
            </div>
            <div className="col-7">
              <label htmlFor="serverUrl" className="form-label">URL</label>
              <input value={this.state.url} required id="serverUrl" name="url" onChange={this.handleChange} className="form-control" placeholder="Ex: http://dev.swagger.io" />
            </div>
          </div>
          <br/>

          <h5>URL Variables<i style={{marginLeft:'1%'}} onClick={this.handleAddNewVariableRow} className="bi bi-plus-circle-fill tiny-font">&nbsp;Add</i></h5>

          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                {enumValueHeader}
                <th>Default</th>
              </tr>
            </thead>
            <tbody>
              {uriVariables}
            </tbody>
          </table>
          <br/>
          <div align="center">
            {this.state.isEditing === true ?
              <button type="submit" className="btn btn-dark">SAVE</button> :
                <button type="submit" className="btn btn-dark">ADD</button>
            }
          </div>
        </form>
        <br/>
        <h5>Existing Servers</h5>
        <div className="existing-tags">
          {existingServers}
        </div>
      </div>
    )
  }

}

export default ServerInfo

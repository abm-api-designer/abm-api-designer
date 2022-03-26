import React from 'react';
import ModalWindow from './ModalWindow'
import './model-builder.css'

const initialState = {
  name : '',
  type : '',
  editing: false,
  modalData : {
    name: ''
  },
  existingProperties : []
}

class ModelBuilder extends React.Component {

  constructor(props){
    super(props)
    this.state = initialState

    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnExistingPropertyChange = this.handleOnExistingPropertyChange.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.resetState = this.resetState.bind(this)
    this.handleOnEdit = this.handleOnEdit.bind(this)
    this.handleAddNewPropertyRow = this.handleAddNewPropertyRow.bind(this)
    this.handleOnModalDataSave = this.handleOnModalDataSave.bind(this)
  }

  handleOpenModal(itemIndex,itemName){
    const foundProp = this.state.existingProperties[itemIndex]
    this.setState({
      modalData: {
        index: itemIndex,
        name: itemName,
        type: foundProp.type,
        readOnly: foundProp.readOnly
      }
    })
  }

  handleOnModalDataSave(savedModalData){
    const existingProps = this.state.existingProperties
    const foundProperty = existingProps[savedModalData.index]
    foundProperty.format = savedModalData.format
    foundProperty.readOnly = savedModalData.readOnly
    this.setState({
      existingProperties : existingProps
    })
  }

  handleOnEdit(modelName){
    const schemas = this.props.project.components.schemas
    const foundSchema = schemas[modelName]
    this.toState(modelName,foundSchema)
  }

  toState(modelName,schema){
    this.setState({
      name: modelName,
      type: schema.type,
      editing: true,
      existingProperties : this.toModelStateProp(schema.required,schema.properties)
    })
  }

  toModelStateProp(requiredProps,schemaProps){
    const properties = []
    for(var prop in schemaProps){
      const details = schemaProps[prop]
      properties.push({
        'name' : prop,
        'type' : details.type,
        'example' : details.example,
        'required' : requiredProps.indexOf(prop) !== -1,
        'format' : details.format,
        'readOnly' : details.readOnly
      })
    }
    return properties
  }

  handleOnSubmit(event){
    event.preventDefault()
    const updatedProject = this.props.project
    const schemas = updatedProject.components.schemas
    const foundModel = schemas[this.state.name]
    if(foundModel === undefined){
      this.createNewModel(schemas)
    } else {
      this.updateExistingModel(foundModel)
    }
    this.props.onChange(updatedProject)
    this.resetState()
  }

  createNewModel(schemas){
    const modelName = this.state.name
    const requiredProps = this.state.existingProperties.filter(it => it.required === true).map(it => it.name)
    schemas[modelName] = {
      'type' : this.state.type,
      'properties' : {},
      'required' : requiredProps
    }
    this.state.existingProperties.forEach((item, index) => {
      schemas[modelName].properties[item.name] = {
        'type' : item.type,
        'format': item.format,
        'example' : item.example,
        'readOnly' : item.readOnly,
        'required' : item.required
      }
    });

  }

  updateExistingModel(foundModel){
    foundModel.type = this.state.type
    foundModel.properties = {}
    const requiredProps = this.state.existingProperties.filter(it => it.required === true).map(it => it.name)
    foundModel.required = requiredProps
    this.state.existingProperties.forEach((item, index) => {
      foundModel.properties[item.name] = {
        'type' : item.type,
        'format': item.format,
        'example' : item.example,
        'readOnly' : item.readOnly,
        'required' : item.required
      }
    });
  }

  handleOnChange(event){
    const target = event.target
    const fieldName = target.name
    const fieldValue = target.value
    this.setState({
      [fieldName] : fieldValue
    })
  }

  handleOnExistingPropertyChange(event,index){
    const target = event.target
    const fieldName = target.name
    const fieldValue = target.type === 'checkbox' ? target.checked : target.value
    const properties = this.state.existingProperties
    const propertyFound = properties[index]
    propertyFound[fieldName] = fieldValue
    this.setState({
      existingProperties : properties
    })
  }

  handleAddNewPropertyRow(){
    const existingProperties = this.state.existingProperties
    existingProperties.push({
      name: '',
      type: '',
      example: '',
      required: false,
      format: '',
      readOnly: false
    })
    this.setState({
      existingProperties : existingProperties
    })
  }

  resetState(){
    initialState.existingProperties = []
    this.setState(initialState)
  }

  render(){
    var models = []
    const schemas = this.props.project.components.schemas
    for(var modelName in schemas){
      models.push(modelName)
    }
    const existingModels = models.map((item,index) =>
      <button key={index} onClick={()=>this.handleOnEdit(item)} type="button" className="btn btn-outline-primary">{item}</button>
    )

    const existingModelProperties = this.state.existingProperties.map((item,index) =>
      <tr key={index}>
        <td width="10%">
          <input name="required" checked={item.required} onChange={(e)=>this.handleOnExistingPropertyChange(e,index)} className="form-check-input checkbox-middle" type="checkbox" id="isRequired"/>
        </td>
        <td width="30%">
          <input name="name" value={item.name} onChange={(e)=>this.handleOnExistingPropertyChange(e,index)} id="fieldName" className="form-control form-control" placeholder="name" />
        </td>
        <td width="30%">
          <select name="type" value={item.type} onChange={(e)=>this.handleOnExistingPropertyChange(e,index)} id="fieldType" className="form-select" aria-label="Field Type">
            <option>Select</option>
            <option value="string">String</option>
            <option value="integer">Integer</option>
            <option value="date">Date</option>
          </select>
        </td>
        <td width="30%">
          <input name="example" value={item.example} onChange={(e)=>this.handleOnExistingPropertyChange(e,index)} id="fieldExample" className="form-control form-control" placeholder="Tommy" />
        </td>
        <td width="3%">
          <i key={index} onClick={() => this.handleOpenModal(index,item.name)}
             data-bs-toggle="modal" data-bs-target="#exampleModal"
             className="bi bi-gear-fill"></i>
        </td>
      </tr>
    )

    return(
      <div>
        <h4 className="page-title">Create Domain Model</h4>

        <form onSubmit={this.handleOnSubmit}>

          <div className="row mb-3">
            <div className="col-8">
              <label htmlFor="tagName" className="form-label">Name</label>
              <input name="name" value={this.state.name} onChange={this.handleOnChange} id="tagName" className="form-control" placeholder="Ex: Pet" />
            </div>
            <div className="col-3">
              <label htmlFor="modelType" className="form-label">Type</label>
              <select name="type" value={this.state.type} onChange={this.handleOnChange} id="modelType" className="form-select" aria-label="Domain Model Type">
                <option>Select</option>
                <option value="object">Object</option>
                <option value="array">Array</option>
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="integer">Integer</option>
                <option value="boolean">Boolean</option>
              </select>
            </div>
          </div>

          <h5>
            Properties
            <i style={{marginLeft:'1%'}} onClick={this.handleAddNewPropertyRow} className="bi bi-plus-circle-fill tiny-font">&nbsp;Add</i>
          </h5>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>Req</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Example</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {existingModelProperties}
              </tbody>
            </table>
          </div>

          <div align="center">
            <button type="clear" className="btn btn-dark button-margin-right">CLEAR</button>
            {this.state.editing === true ?
            <button type="submit" className="btn btn-dark">SAVE</button>:
            <button type="submit" className="btn btn-dark">ADD</button>}
          </div>

        </form>

        <h5>Existing Models</h5>
        <div className="existing mb-3">
          {existingModels}
        </div>

        <ModalWindow data={this.state.modalData} onSave={this.handleOnModalDataSave}/>

      </div>
    )
  }

}


export default ModelBuilder;

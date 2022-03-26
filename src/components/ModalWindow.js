import React from 'react'
import './modal-window.css'

const typeToFormatMapping = {
    'integer' : ['int32', 'int64'],
    'number' : ['float', 'double'],
    'string' : ['byte', 'binary', 'date', 'date-time', 'password']
}

class ModalWindow extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      format : '',
      readOnly : false
    }
    this.invokeTrigger = this.invokeTrigger.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnSave = this.handleOnSave.bind(this)
    this.resetState = this.resetState.bind(this)
  }

  invokeTrigger(){
    document.getElementById('modalTrigger').click()
  }

  handleOnChange(event){
    const target = event.target
    const fieldName = target.name
    const fieldValue = target.value
    this.setState({
      [fieldName] : fieldValue
    })
  }

  handleOnSave(event){
    event.preventDefault()
    this.props.onSave({
      'index' : this.props.data.index,
      'name' : this.props.data.name,
      'format' : this.state.format,
      'readOnly' : this.state.readOnly === 'true'
    })
    this.resetState()
  }

  resetState(){
    this.setState({
      'format' : '',
      'readOnly' : false
    })
  }

  render(){
    const selectedPropertyType = this.props.data.type
    const formats = typeToFormatMapping[selectedPropertyType] === undefined ? [] : typeToFormatMapping[selectedPropertyType]
    const formatOptions = formats.map((format,index)=>
      <option key={index} value={format}>{format}</option>
    )

    return(
      <div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{'Configuring Property : '+this.props.data.name}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={this.handleOnSave}>
                <div className="modal-body">
                    <div className="row">
                      <div className="col-4">
                        <label htmlFor="fieldFormat" className="form-label">Format</label>
                        <select name="format" value={this.props.data.format} onChange={this.handleOnChange} id="fieldFormat" className="form-select" aria-label="Format">
                          <option>Select</option>
                          {formatOptions}
                        </select>
                      </div>
                      <div className="col-4 form-check-inline">
                        <label className="form-check-label" htmlFor="readOnly">ReadOnly</label><br/>
                        <input className="form-check-input checkradio-middle" onChange={this.handleOnChange} checked={this.state.readOnly} value="true" name="readOnly" type="radio" id="readOnly"/>
                      </div>
                      <div className="col-3 form-check-inline">
                        <label className="form-check-label" htmlFor="writeOnly">WriteOnly</label><br/>
                        <input className="form-check-input checkradio-middle" onChange={this.handleOnChange} checked={!this.state.readOnly} value="false" name="readOnly" type="radio" id="writeOnly"/>
                      </div>
                    </div>
                </div>
                <div className="modal-footer">
                  <button type="clear" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">SAVE</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default ModalWindow

import React from 'react';

class LicenseInfo extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      url: ''
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleOnChange(event){
    const target = event.target
    const fieldName = target.name
    const fieldValue = target.value
    this.setState({
      [fieldName] : fieldValue
    })
  }

  handleSubmit(event){
    event.preventDefault()
    const newProject = this.props.project
    const projectInfo = newProject.info
    projectInfo.license = {
      name: this.state.name,
      url: this.state.url
    }
    this.props.onChange(newProject)
  }

  render(){
    return(
      <div>
        <h4 className="page-title">License Info</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="col-6">
            <label htmlFor="licenseName" className="form-label custom-label">Name</label>
            <input required name="name" value={this.state.name} onChange={this.handleOnChange} id="licenseName" className="form-control form-control-md" placeholder="Apache 2.0" />
          </div>
          <div className="col-12">
            <label htmlFor="licenseURL" className="form-label custom-label">URL</label>
            <input required type="url" name="url" value={this.state.url} onChange={this.handleOnChange} id="licenseURL" className="form-control form-control-md" placeholder="http://www.apache.org/licenses/LICENSE-2.0.html" />
          </div>
          <br/>
          <div align="center">
            <button type="submit" className="btn btn-dark">SAVE</button>
          </div>
        </form>
      </div>
    )
  }

}

export default LicenseInfo;

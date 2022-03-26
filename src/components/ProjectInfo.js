import React from 'react'
import './project-info.css'

class ProjectInfo extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        title: '',
        description: '',
        version: '',
        termsOfService: '',
        contact: ''
      }

      this.handleOnChange = this.handleOnChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleOnEdit = this.handleOnEdit.bind(this)
      this.resetState = this.resetState.bind(this)
    }

    handleOnChange(event){
      const target = event.target;
      const fieldName = target.name;
      const fieldValue = target.value;
      this.setState({
        [fieldName]: fieldValue
      })
    }

    handleOnEdit(){
      const info = this.props.project.info
      this.setState({
        title: info.title,
        description: info.description,
        version: info.version,
        termsOfService: info.termsOfService,
        contact: info.contact.email
      })
    }

    handleSubmit(event){
      event.preventDefault()
      const newProject = this.props.project
      newProject.info = {
        title: this.state.title,
        description: this.state.description,
        version: this.state.version,
        termsOfService: this.state.termsOfService,
        contact: {
          email: this.state.contact
        }
      }
      this.props.onChange(newProject)
      this.resetState()
    }

    resetState(){
      this.setState({
        title: '',
        description: '',
        version: '',
        termsOfService: '',
        contact: ''
      })
    }

    render() {
        const info = this.props.project.info

        if(info.contact === undefined){
          info.contact = {}
        }

        return (
            <div>
                <h4 className="page-title">Project Info</h4>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-floating mb-3">
                    <input id="projectName" required name="title" value={this.state.title} onChange={this.handleOnChange} className="form-control" placeholder="Ex: Swagger PetStore" />
                    <label htmlFor="projectName" className="form-label">Title</label>
                  </div>
                  <div className="form-floating">
                    <textarea id="projectDescription" name="description" value={this.state.description} onChange={this.handleOnChange} className="form-control" style={{height:'80px'}} placeholder="Ex: This is a sample server Petstore server"></textarea>
                    <label htmlFor="projectDescription">Description</label>
                  </div>
                  <div className="row">
                    <div className="col-3">
                      <label htmlFor="projectVersion" className="form-label custom-label">Version</label>
                      <input id="projectVersion" name="version" value={this.state.version} onChange={this.handleOnChange} className="form-control form-control-sm" placeholder="1.0.0" />
                    </div>
                    <div className="col-9">
                      <label htmlFor="termsOfService" className="form-label custom-label">Terms of Service</label>
                      <input id="termsOfService" type="url" name="termsOfService" value={this.state.termsOfService} onChange={this.handleOnChange} className="form-control form-control-sm" placeholder="http://swagger.io/terms/" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="developerContact" className="form-label custom-label">Contact</label>
                      <input id="developerContact" type="email" name="contact" value={this.state.contact} onChange={this.handleOnChange} className="form-control form-control-sm" placeholder="apiteam@swagger.io" />
                    </div>
                  </div>
                  <br/>
                  <div align="center">
                    {Object.keys(this.props.project.info).length > 1 &&
                      <button type="button" className="btn btn-dark" onClick={this.handleOnEdit}>EDIT</button>
                    }
                    <button type="submit" className="btn btn-dark button-margin">SAVE</button>
                  </div>
                </form>
            </div>
        )
    }

}

export default ProjectInfo;

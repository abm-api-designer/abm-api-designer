import React from 'react'
import './tags.css'

class Tags extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      name : '',
      description : '',
      externalDocsDesc: '',
      externalDocsUrl: '',
      isEditing: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetState = this.resetState.bind(this)
    this.handleOnEdit = this.handleOnEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  resetState(){
    this.setState({
      name : '',
      description : '',
      externalDocsDesc: '',
      externalDocsUrl: '',
      isEditing: false
    })
  }

  handleChange(event){
    const target = event.target;
    const fieldName = target.name;
    const fieldValue = target.value;
    this.setState({
      [fieldName] : fieldValue
    })
  }

  handleSubmit(event){
    event.preventDefault()
    const updatedProject = this.props.project
    const tagFound = updatedProject.tags.find(tag => tag.name === this.state.name)

    if(tagFound === undefined){
      this.createNew(updatedProject)
    } else {
      tagFound.description = this.state.description
    }

    this.props.onChange(updatedProject)
    this.resetState()
  }

  // TODO Move all such mapping logic in one place. Potentially in the DataBuilder.js
  createNew(updatedProject){
    const newTag = {
      name: this.state.name,
      description: this.state.description,
      externalDocs: {
        description: this.state.externalDocsDesc,
        url: this.state.externalDocsUrl
      }
    }
    updatedProject.tags.push(newTag)
  }

  handleDelete(tagName){
    const newProject = this.props.project
    const filteredTags = newProject.tags.filter(tag => tag.name !== tagName)
    newProject.tags = filteredTags
    this.props.onChange(newProject)
    this.resetState()
  }

  handleOnEdit(selectedTagName){
    const foundTag = this.props.project.tags.find(tag => tag.name === selectedTagName)
    const externalDocs = foundTag.externalDocs
    this.setState({
      name: foundTag.name,
      description: foundTag.description,
      externalDocsDesc : externalDocs === undefined ? '' : externalDocs.description,
      externalDocsUrl: externalDocs === undefined ? '' : externalDocs.url,
      isEditing: true
    })
  }

  render(){
    const tagList = this.props.project.tags.map((tag,index) =>
      <button key={index} onClick={()=>this.handleOnEdit(tag.name)} type="button" className="btn btn-outline-primary mb-2">{tag.name}</button>
    )

    const deleteTagBtn = this.state.isEditing === true ?
    <button type="button" onClick={()=>this.handleDelete(this.state.name)} className="btn btn-dark clear-btn">DELETE</button> : '';

    return(
      <div>
        <h4 className="page-title">Add New Tag</h4>
        <h5>Basic Information</h5>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-4">
              <label htmlFor="tagName" className="form-label">Name</label>
              <input required disabled={this.state.isEditing === true} name="name" onChange={this.handleChange} value={this.state.name} id="tagName" className="form-control" placeholder="Ex: pet" />
            </div>
            <div className="col-8">
              <label htmlFor="tagDescription" className="form-label">Description</label>
              <input name="description" onChange={this.handleChange} value={this.state.description} id="tagDescription" className="form-control" placeholder="Ex: Everything about your Pets" />
            </div>
          </div>
          <br/>
          <h5>External Docs</h5>
          <div className="row">
            <div className="col-5">
              <label htmlFor="extDocsDesc" className="form-label">Description</label>
              <input name="externalDocsDesc" onChange={this.handleChange} value={this.state.externalDocsDesc} id="extDocsDesc" className="form-control" placeholder="Ex: Find out more" />
            </div>
            <div className="col-7">
              <label htmlFor="externalDocsUrl" className="form-label">URL</label>
              <input type="url" name="externalDocsUrl" onChange={this.handleChange} value={this.state.externalDocsUrl} id="externalDocsUrl" className="form-control" placeholder="Ex: http://swagger.io" />
            </div>
          </div>
          <br/>
          <div align="center">
            {deleteTagBtn}
            <button type="reset" onClick={this.resetState} className="btn btn-dark clear-btn">CLEAR</button>
            <button type="submit" className="btn btn-dark">
            {this.state.isEditing === true ? 'SAVE TAG' : 'ADD TAG' }
            </button>
          </div>
        </form>
        <h5>Existing Tags</h5>
        <div className="existing-tags">
          {tagList}
        </div>
      </div>
    )
  }

}

export default Tags;

import React from 'react'
import './home.css'
import { Link } from 'react-router-dom';

var data

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.handleFileUploadTrigger = this.handleFileUploadTrigger.bind(this)
    this.handleOnFileUpload = this.handleOnFileUpload.bind(this)
    this.handleOnUpload = this.handleOnUpload.bind(this)
  }

  handleFileUploadTrigger() {
    document.getElementById('file-upload-input').click()
  }

  handleOnFileUpload(event) {
    const file = event.target.files[0]
    const fileReader = new FileReader()
    fileReader.onload = function (loadEvent) {
      data = JSON.parse(loadEvent.target.result)
    }
    fileReader.readAsText(file)
  }

  handleOnUpload() {
    this.props.onChange(data)
  }

  render() {
    return (
      <div align="center" className="main-container row">
        <Link className="btn btn-dark btn-lg mb-3" to="/project-info">Start Designing</Link>
        <button className="btn btn-dark btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal">Upload Spec</button>

        <div className="standard-flow">
          <h4>API Design Flow</h4>
          <p>
            The API Design flow to be followed using API Designer starts with creation of dependent entities. Below is the order of flow :
            <ol>
              <li>
                <h6>Basic Config</h6>
                <div>You start with basic project configurations configuring below details</div>
                <ul>
                  <li>
                    <b>Project:</b> Create a Project
                  </li>
                  <li>
                    <b>License:</b> Define License Info for the Project
                  </li>
                  <li>
                    <b>Tags:</b> Create Tags for API categorization
                  </li>
                  <li>
                    <b>Servers:</b> Define API servers like Dev, Staging, Production, etc.
                  </li>
                </ul>
              </li>

              <li>
                <h6>Components</h6>
                <div>Creating resuable components will help in reducing redundancy and efforts. In this section you can create
                  below mentioned components</div>
                <ul>
                  <li>
                    <b>Models:</b> Define Domain Models for the Project
                  </li>
                  <li>
                    <b>Parameters:</b> Define API Parameters like Path, Query, Header, etc.
                  </li>
                  <li>
                    <b>Request Bodies:</b>Define the structure of Request Body for API
                  </li>
                  <li>
                    <b>Responses:</b>Define the standard responses for the APIs
                  </li>
                </ul>
              </li>

              <li>
                <h6>API Specs</h6>
                <div>
                  Now you are ready with pre-requisites. You can start designing API Resources by clubbing them
                </div>
                <ul>
                  <b>API Resources:</b>Create APIs defining the API resource Endpoints
                </ul>
              </li>

            </ol>
            <ul>


            </ul>
          </p>
        </div>

        <input id="file-upload-input" onChange={this.handleOnFileUpload} type="file" />
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Upload Spec File</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <i onClick={this.handleFileUploadTrigger} className="bi bi-upload file-upload-icon"></i>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" onClick={this.handleOnUpload} data-bs-dismiss="modal" className="btn btn-primary">UPLOAD</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Home

import './app.css'

import ProjectInfo from './components/ProjectInfo'
import LicenseInfo from './components/LicenseInfo'
import Tags from './components/Tags'
import ServerInfo from './components/ServerInfo'
import ApiResource from './components/ApiResource'
import RequestBodies from './components/RequestBodies'
import ModelBuilder from './components/ModelBuilder'
import { Project } from './data/DataBuilder'
import ApiResponse from './components/ApiResponse'
import Home from './components/Home'
import Parameters from './components/Parameters'

import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import React from 'react';

import SwaggerVisualizer from './components/visualizer/SwaggerVisualizer';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      project: new Project()
    }
    this.handleOnUpdate = this.handleOnUpdate.bind(this)
    this.handleDownloadFile = this.handleDownloadFile.bind(this)
    this.isHomePage = this.isHomePage.bind(this)
  }

  handleOnUpdate(newProject) {
    console.log(JSON.stringify(newProject));
    this.setState({
      project: newProject
    })
  }

  handleDownloadFile() {
    const data = this.state.project
    const filename = 'api-builder-spec-openapi-v3.json'
    const json = JSON.stringify(data)
    const blob = new Blob([json], { type: 'application/json' })
    const href = URL.createObjectURL(blob)
    const downloadLink = document.createElement('a')
    downloadLink.href = href
    downloadLink.download = filename
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  isHomePage() {
    const currenPath = window.location.pathname
    const defaultPath = "/"
    const homePath = "/home"
    return currenPath === defaultPath || currenPath === homePath
  }

  render() {

    return (
      <Router>
        <div className="App">
          <header className="py-3 mb-3 bg-dark border-bottom">
            <div className="container-fluid d-grid gap-3 align-items-center" style={{ gridTemplateColumns: '1fr 2fr' }}>
              <div className="dropdown">
                <a href="/#"
                  className="d-flex align-items-center col-lg-2 mb-2 mb-lg-0 text-blue text-decoration-none dropdown-toggle"
                  id="dropdownNavLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <i className="bi bi-palette site-icon"></i>
                </a>
                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownNavLink" >
                  <li><h6 className="dropdown-header">Basic Config</h6></li>
                  <li>
                    <Link className="dropdown-item" aria-current="page" to="/project-info">Project</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/license">License</Link>
                  </li>
                  <li><Link className="dropdown-item" to="/tags" >Tags</Link></li>
                  <li><Link className="dropdown-item" to="/servers" >Servers</Link></li>

                  <li><hr className="dropdown-divider" /></li>
                  <li><h6 className="dropdown-header">Components</h6></li>
                  <li><Link className="dropdown-item" to="/model-builder">Models</Link></li>
                  <li><Link className="dropdown-item" to="/parameters">Parameters</Link></li>
                  <li><Link className="dropdown-item" to="/request-bodies">Request Bodies</Link></li>
                  <li><Link className="dropdown-item" to="/responses">Responses</Link></li>
                  {
                    // <li><Link className="dropdown-item" to="/security-schemes">Security Schemes</Link></li>
                  }
                  <li><hr className="dropdown-divider" /></li>
                  <li><h6 className="dropdown-header">API Specs</h6></li>
                  <li><Link className="dropdown-item" to="/apis">API Resources</Link></li>

                </ul>
              </div>

              <div className="d-flex align-items-center">
                <div className="w-100 me-3 text-blue">
                  <h2 className="site-header-title">
                    <Link to="/home">API Designer</Link>
                    <span className="developed-by">&nbsp;(&nbsp;Anand Muley&nbsp;)</span>
                  </h2>
                </div>
                {
                  //   <form className="w-100 me-3">
                  //   <input type="search" className="form-control" placeholder="Search..." aria-label="Search"/>
                  // </form>
                }
                <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                  <li>
                    <a href="/#" title="Download Spec" className="nav-link text-blue" onClick={this.handleDownloadFile}>
                      <i className="bi bi-file-earmark-arrow-down-fill d-block header-icon"></i>
                    </a>
                  </li>
                </ul>
                {
                  // <div className="flex-shrink-0 dropdown">
                  //   <a href="/#" className="d-block link-light text-decoration-none dropdown-toggle text-blue" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                  //     <i className="bi bi-list"></i>
                  //   </a>
                  //   <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2" >
                  //     <li><a href="/#" className="dropdown-item" >New project...</a></li>
                  //     <li><a href="/#" className="dropdown-item" >Settings</a></li>
                  //     <li><a href="/#" className="dropdown-item" >Profile</a></li>
                  //     <li><hr className="dropdown-divider" /></li>
                  //     <li><a href="/#" className="dropdown-item" >Sign out</a></li>
                  //   </ul>
                  // </div>
                }
              </div>
            </div>
          </header>
          <div className="container-fluid pb-3">
            <div className="d-grid gap-3" style={{ gridTemplateColumns: '2fr 3fr' }}>
              <div className="bg-light border rounded-3 left-panel">
                <div className="site-title">
                  <h2>Designer</h2>
                </div>
                <Switch>
                  <Route path="/project-info">
                    <ProjectInfo project={this.state.project} onChange={this.handleOnUpdate} />
                  </Route>
                  <Route path="/license">
                    <LicenseInfo project={this.state.project} onChange={this.handleOnUpdate} />
                  </Route>
                  <Route path="/tags">
                    <Tags project={this.state.project} onChange={this.handleOnUpdate} />
                  </Route>
                  <Route path="/servers">
                    <ServerInfo project={this.state.project} onChange={this.handleOnUpdate} />
                  </Route>
                  <Route path="/apis">
                    <ApiResource project={this.state.project} onChange={this.handleOnUpdate} />
                  </Route>
                  <Route path="/request-bodies">
                    <RequestBodies project={this.state.project} onChange={this.handleOnUpdate} />
                  </Route>
                  <Route path="/model-builder">
                    <ModelBuilder project={this.state.project} onChange={this.handleOnUpdate} />
                  </Route>
                  <Route path="/responses">
                    <ApiResponse project={this.state.project} onChange={this.handleOnUpdate} />
                  </Route>
                  <Route path="/parameters">
                    <Parameters project={this.state.project} onChange={this.handleOnUpdate} />
                  </Route>
                  <Route path="/home">
                    <Home project={this.state.project} onChange={this.handleOnUpdate} />
                  </Route>
                  <Route path="/">
                    <Home project={this.state.project} onChange={this.handleOnUpdate} />
                  </Route>
                </Switch>
              </div>
              {(window.location.pathname !== '/' || window.location.pathname !== '/home') &&
                <div className="bg-light border rounded-3">
                  <SwaggerVisualizer project={this.state.project} />
                </div>
              }
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;

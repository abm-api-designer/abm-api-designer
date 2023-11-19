import "./app.css";
import NavBar from "./layout/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectPage from "./components/ProjectPage";
import { Grid } from "@mui/material";
import SwaggerDisplay from "./components/SwaggerDisplay";
import HowToUse from "./components/HowToUse";
import License from "./components/License";
import TagsPage from "./components/TagsPage";
import ServersPage from "./components/ServersPage";
import { Project, Server, Tag } from "./models/SwaggerModels";
import { createContext, useEffect, useState } from "react";

export const initialTagState = {
  name: "",
  description: "",
  externalDocs: { url: "", description: "" },
};

export const initialServerState = {
  description: "",
  url: "",
  variables: {},
} as Server;

export const initialState = {
  openapi: "3.0.2",
  info: {
    title: "",
    description: "",
    version: "",
    termsOfService: "",
    contact: {
      email: "",
    },
    license: {
      name: "",
      url: "",
    },
  },
  tags: [] as Tag[],
  servers: [] as Server[],
} as Project;

function loadFromLocalStorage(initialState: Project) {
  let dataFromLocalStorage = initialState;
  if (typeof Storage !== "undefined") {
    let localDataAsString = localStorage.getItem("api-designer");
    if (localDataAsString !== null) {
      dataFromLocalStorage = JSON.parse(localDataAsString);
    }
  } else {
    alert(
      "The browser does not support local storage hence if you refresh the tab the data will be lost"
    );
  }
  return dataFromLocalStorage;
}

export const ProjectContext = createContext({
  project: initialState,
  setProject: (project: Project) => {},
  toggleProjectUpdated: () => {},
});

function App() {
  const [project, setProject] = useState(loadFromLocalStorage(initialState));
  const [alertStorageSupport, setAlertStorageSupport] = useState(false);
  const [projectUpdated, setProjectUpdated] = useState(false);

  const defaultValue = {
    project,
    setProject,
    toggleProjectUpdated,
  };

  function toggleProjectUpdated() {
    setProjectUpdated(!projectUpdated);
  }

  useEffect(() => {
    if (typeof Storage !== "undefined") {
      localStorage.setItem("api-designer", JSON.stringify(project));
    } else if (alertStorageSupport === false) {
      setAlertStorageSupport(true);
    }
  }, [project, alertStorageSupport, projectUpdated]);

  useEffect(() => {
    if (alertStorageSupport === true) {
      alert(
        "The browser does not support local storage hence if you refresh the tab the data will be lost"
      );
    }
  }, [alertStorageSupport]);

  return (
    <ProjectContext.Provider value={defaultValue}>
      <Router>
        <div className="App">
          <NavBar />
          <Grid container spacing={3}>
            <Grid
              item
              xs={5}
              style={{
                paddingLeft: "4%",
                paddingRight: "4%",
                borderRight: "solid 2px #1976d2",
                width: "100%",
              }}
            >
              <Routes>
                <Route path="/servers" element={<ServersPage />} />
                <Route path="/tags" element={<TagsPage />} />
                <Route path="/license" element={<License />} />
                <Route path="/project" element={<ProjectPage />} />
                <Route path="/" element={<HowToUse />} />
              </Routes>
            </Grid>
            <Grid item xs={7} sx={{ textAlign: "left" }}>
              <SwaggerDisplay />
            </Grid>
          </Grid>
        </div>
      </Router>
    </ProjectContext.Provider>
  );
}

export default App;

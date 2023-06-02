import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { initialTagState, ProjectContext } from "../App";
import { Project } from "../models/SwaggerModels";
import { addNew } from "../mappers/TagMapper";
import ListDisplay from "./ListDisplay";

export default function TagsPage() {
  const [selectedTagName, setSelectedTagName] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [externalDocURL, setExternalDocURL] = useState("");
  const [externalDocDesc, setExternalDocDesc] = useState("");

  function handleOnAdd(
    project: Project,
    setProject: (project: Project) => void,
    toggleProjectUpdated: () => void
  ) {
    addNew(project.tags, {
      name,
      description: description,
      externalDocs: {
        url: externalDocURL,
        description: externalDocDesc,
      },
    });
    setProject(project);
    toggleProjectUpdated();
  }

  return (
    <ProjectContext.Consumer>
      {({ project, setProject, toggleProjectUpdated }) => {
        let currentTag = project.tags.find(
          (item) => item.name === selectedTagName
        );
        if (currentTag === undefined) {
          currentTag = initialTagState;
        }
        return (
          <Paper sx={{ padding: "5%", marginTop: "5%" }}>
            <Typography variant="h5" color="#1976d2">
              Create new Tag
            </Typography>
            <form>
              <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
                <Typography variant="h6">Basic Information</Typography>
                <Stack direction="row" spacing={3}>
                  <TextField
                    sx={{ width: "50%" }}
                    size="small"
                    variant="outlined"
                    label="Name"
                    placeholder="Pet"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                  />
                  <TextField
                    size="small"
                    fullWidth
                    label="Description"
                    placeholder="Everything about Pet"
                    value={description}
                    onChange={(e) => setDescription(e.currentTarget.value)}
                  ></TextField>
                </Stack>
                <Typography variant="h6">External Docs</Typography>
                <Stack direction="row" spacing={3}>
                  <TextField
                    sx={{ width: "50%" }}
                    size="small"
                    variant="outlined"
                    label="Description"
                    placeholder="Find out more"
                    value={externalDocDesc}
                    onChange={(e) => setExternalDocDesc(e.currentTarget.value)}
                  />
                  <TextField
                    size="small"
                    fullWidth
                    label="URL"
                    placeholder="http://swagger.io"
                    value={externalDocURL}
                    onChange={(e) => setExternalDocURL(e.currentTarget.value)}
                  ></TextField>
                </Stack>
                <Stack
                  alignSelf="flex-end"
                  sx={{ paddingRight: "6%", width: "25%" }}
                >
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleOnAdd(project, setProject, toggleProjectUpdated)
                    }
                  >
                    ADD
                  </Button>
                </Stack>
                <ListDisplay
                  title="Existing Tags"
                  items={project.tags.map((item) => ({ name: item.name }))}
                  onItemClick={(item) => setSelectedTagName(item.name)}
                />
              </Stack>
            </form>
          </Paper>
        );
      }}
    </ProjectContext.Consumer>
  );
}

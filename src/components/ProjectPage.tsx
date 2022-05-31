import { Paper, Stack, TextField } from "@mui/material";
import { ProjectContext } from "../App";

export default function ProjectPage() {
  return (
    <ProjectContext.Consumer>
      {({ project, setProject }) => (
        <Paper sx={{ padding: "5%", marginTop: "5%", width: "100%" }}>
          <h2>Project</h2>
          <form>
            <Stack spacing={2}>
              <TextField
                fullWidth
                variant="outlined"
                label="Title"
                placeholder="Enter title of the project"
                value={project.info.title}
                onChange={(e) =>
                  setProject({
                    ...project,
                    info: {
                      ...project.info,
                      title: e.currentTarget.value,
                    },
                  })
                }
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                // maxRows={4}
                label="Description"
                placeholder="Mention few words about the project"
                value={project.info.description}
                onChange={(e) =>
                  setProject({
                    ...project,
                    info: {
                      ...project.info,
                      description: e.currentTarget.value,
                    },
                  })
                }
              ></TextField>
              <Stack direction="row" spacing={1}>
                <TextField
                  sx={{ width: "30%" }}
                  size="small"
                  label="Version"
                  placeholder="1.0.0"
                  value={project.info.version}
                  onChange={(e) =>
                    setProject({
                      ...project,
                      info: {
                        ...project.info,
                        version: e.currentTarget.value,
                      },
                    })
                  }
                />
                <TextField
                  sx={{ width: "70%" }}
                  size="small"
                  label="Terms of Service"
                  placeholder="http://swagger.io/terms/"
                  value={project.info.termsOfService}
                  onChange={(e) =>
                    setProject({
                      ...project,
                      info: {
                        ...project.info,
                        termsOfService: e.currentTarget.value,
                      },
                    })
                  }
                />
              </Stack>
              <TextField
                sx={{ width: "50%" }}
                label="Contact"
                placeholder="apiteam@swagger.io"
                size="small"
                value={project.info.contact.email}
                onChange={(e) =>
                  setProject({
                    ...project,
                    info: {
                      ...project.info,
                      contact: {
                        ...project.info.contact,
                        email: e.currentTarget.value,
                      },
                    },
                  })
                }
              />
              {/* <Stack direction="row" spacing={8}>
                <Button sx={{ width: "40%" }} variant="contained">
                  EDIT
                </Button>
                <Button
                  sx={{ width: "40%" }}
                  variant="contained"
                  onClick={() => handleOnSave(project, setProject)}
                >
                  SAVE
                </Button>
              </Stack> */}
            </Stack>
          </form>
        </Paper>
      )}
    </ProjectContext.Consumer>
  );
}

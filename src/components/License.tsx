import { Button, Paper, Stack, TextField } from "@mui/material";
import { ProjectContext } from "../App";

export default function License() {
  return (
    <ProjectContext.Consumer>
      {({ project, setProject }) => (
        <Paper sx={{ padding: "5%", marginTop: "5%" }}>
          <h2>License</h2>
          <form>
            <Stack spacing={2}>
              <TextField
                sx={{ width: "50%" }}
                size="small"
                variant="outlined"
                label="Name"
                placeholder="Apache 2.0"
                value={project.info.license.name}
                onChange={(e) =>
                  setProject({
                    ...project,
                    info: {
                      ...project.info,
                      license: {
                        ...project.info.license,
                        name: e.currentTarget.value,
                      },
                    },
                  })
                }
              />
              <TextField
                size="small"
                fullWidth
                label="URL"
                placeholder="http://www.apache.org/licenses/LICENSE-2.0.html"
                value={project.info.license.url}
                onChange={(e) =>
                  setProject({
                    ...project,
                    info: {
                      ...project.info,
                      license: {
                        ...project.info.license,
                        url: e.currentTarget.value,
                      },
                    },
                  })
                }
              ></TextField>
            </Stack>
          </form>
        </Paper>
      )}
    </ProjectContext.Consumer>
  );
}

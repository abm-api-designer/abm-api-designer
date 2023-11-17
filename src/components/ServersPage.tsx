import { styled } from "@mui/material/styles";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { initialServerState, ProjectContext } from "../App";
import { useState } from "react";
import { addServer, findAndReplace } from "../utils/CollectionUtils";
import {
  Project,
  Server,
  ServerVariable,
  ServerVariableItem,
} from "../models/SwaggerModels";
import ListDisplay, { ListItem } from "./ListDisplay";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export enum VariableType {
  ENUM,
  STRING,
}

export interface SimpleServerVariable {
  name: string;
  default: string;
  type: VariableType;
  description: string;
}

const initVar = {
  name: "",
  type: VariableType.STRING,
  description: "",
  default: "",
};

export default function ServersPage() {
  const [selectedServerDesc, setSelectedServerDesc] = useState("");
  const [description, setDescription] = useState("");
  const [serverUrl, setServerUrl] = useState("");
  const [variables, setVariables] = useState([
    initVar,
  ] as SimpleServerVariable[]);

  function addNewVar() {
    setVariables([...variables, initVar]);
  }

  function setField(fieldName: string, givenIndex: number, value: string) {
    const updatedVariables = findAndReplace(
      givenIndex,
      fieldName,
      value,
      variables
    );
    setVariables(updatedVariables);
  }

  function removeVariable(givenIndex: number) {
    const filteredVars = variables.filter(
      (_, currentIndex) => currentIndex !== givenIndex
    );
    setVariables(filteredVars);
  }

  function mapVariables() {
    let mappedVars = {} as ServerVariableItem;
    variables.forEach(
      (varItem) =>
        (mappedVars[varItem.name] = {
          default: varItem.default,
          description: varItem.description,
          enum: [],
        } as ServerVariable)
    );
    return mappedVars;
  }

  function mapServer() {
    return {
      description: description,
      url: serverUrl,
      variables: mapVariables(),
    };
  }

  function resetForm() {
    setSelectedServerDesc("");
    setDescription("");
    setVariables([initVar] as SimpleServerVariable[]);
    setServerUrl("");
  }

  function handleOnSave(
    project: Project,
    setProject: (project: Project) => void
  ) {
    let mappedServers = [mapServer()];
    if (project.servers.length > 0) {
      mappedServers = project.servers.map((item) =>
        item.description === description ? mapServer() : item
      );
    }
    setProject({
      ...project,
      servers: mappedServers,
    });
    resetForm();
  }

  function mapToDisplay(variables: ServerVariableItem) {
    var mappedVars = [] as SimpleServerVariable[];
    Object.keys(variables).forEach((key) => {
      mappedVars.push({
        default: variables[key].default,
        name: key,
        type: VariableType.STRING,
        description: variables[key].description,
      });
    });
    return mappedVars;
  }

  return (
    <ProjectContext.Consumer>
      {({ project, setProject }) => {
        let currentServer = project.servers.find(
          (item) => item.description === selectedServerDesc
        );
        if (currentServer === undefined) {
          currentServer = initialServerState;
        }
        return (
          <Paper
            sx={{
              padding: "5%",
              marginTop: "5%",
              width: "100%",
            }}
          >
            <Typography variant="h5" color="#1976d2">
              Add Server
            </Typography>
            <form>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    sx={{ width: "40%" }}
                    size="small"
                    variant="outlined"
                    label="Description"
                    placeholder="Development"
                    value={currentServer.description}
                    onChange={(e) => setDescription(e.currentTarget.value)}
                  />
                  <TextField
                    size="small"
                    fullWidth
                    label="URL"
                    placeholder="http://dev.swagger.io"
                    value={currentServer.url}
                    onChange={(e) => setServerUrl(e.currentTarget.value)}
                  ></TextField>
                </Stack>
                <Typography textAlign="left" variant="h6">
                  URL Variables{" "}
                  <IconButton onClick={addNewVar} color="primary">
                    <AddCircle fontSize="small" />
                  </IconButton>
                </Typography>
                <Table>
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Type</StyledTableCell>
                      <StyledTableCell>Default</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {mapToDisplay(currentServer.variables).map(
                      (item: SimpleServerVariable, index: number) => (
                        <StyledTableRow key={"var-" + index}>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            sx={{ width: "30%" }}
                          >
                            <TextField
                              size="small"
                              placeholder="Name"
                              value={item.name}
                              onChange={(e) =>
                                setField("name", index, e.currentTarget.value)
                              }
                            />
                          </StyledTableCell>
                          <StyledTableCell sx={{ width: "25%" }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Type
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                size="small"
                                value={item.type.toString()}
                                label="Type"
                                onChange={(e) =>
                                  setField(
                                    "type",
                                    index,
                                    e.target.value.toString()
                                  )
                                }
                              >
                                <MenuItem value="ENUM">Enum</MenuItem>
                                <MenuItem value="STRING">String</MenuItem>
                              </Select>
                            </FormControl>
                          </StyledTableCell>
                          <StyledTableCell>
                            <TextField
                              size="small"
                              placeholder="Default Val"
                              value={item.default}
                              onChange={(e) =>
                                setField(
                                  "default",
                                  index,
                                  e.currentTarget.value
                                )
                              }
                            />
                          </StyledTableCell>
                          <StyledTableCell sx={{ width: "1%" }}>
                            <IconButton
                              onClick={() => removeVariable(index)}
                              color="error"
                            >
                              <RemoveCircle />
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    )}
                  </TableBody>
                </Table>
                <Stack direction="row-reverse">
                  <Button
                    onClick={() => handleOnSave(project, setProject)}
                    sx={{ width: "25%" }}
                    variant="contained"
                  >
                    SAVE
                  </Button>
                </Stack>
                <ListDisplay
                  title="Existing Servers"
                  items={project.servers.map((item) => ({
                    name: item.description,
                  }))}
                  onItemClick={(item) => setSelectedServerDesc(item.name)}
                />
              </Stack>
            </form>
          </Paper>
        );
      }}
    </ProjectContext.Consumer>
  );
}

import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ServerURLVariables, {
  SimpleServerVariable,
} from "./servers/ServerURLVariables";
import { useAppDispatch, useAppSelector } from "../data/hooks";
import { addServer } from "../data/slices/projectSlice";
import { convertToServerVariableItems } from "../converters/ServerVariableConverter";
import { ExistingServers } from "./servers/ExistingServers";
import { mapServerVariablesToDisplay } from "../mappers/ServerMapper";
import SaveIcon from "@mui/icons-material/Save";

export default function ServersPage() {
  const [selectedServerDesc, setSelectedServerDesc] = useState("");
  const [description, setDescription] = useState("");
  const [serverUrl, setServerUrl] = useState("");
  const [variables, setVariables] = useState<SimpleServerVariable[]>([]);
  const dispatch = useAppDispatch();
  const savedServers = useAppSelector((state) => state.servers);
  // const [currentSelectedServer, setCurrentSelectedServer] =
  //   useState<ServerEntity>();

  const [disableVarAdd, setDisableVarAdd] = useState(true);

  useEffect(() => {
    if (selectedServerDesc && selectedServerDesc !== "") {
      const foundItem = savedServers.find(
        (item) => item.description === selectedServerDesc
      );
      if (foundItem) {
        // setCurrentSelectedServer(foundItem);
        setDescription(foundItem.description);
        setServerUrl(foundItem.url);
        const displayValue = mapServerVariablesToDisplay(foundItem.variables);
        setVariables(displayValue);
      }
    }
  }, [selectedServerDesc, savedServers]);

  useEffect(() => {
    setDisableVarAdd(serverUrl === undefined || serverUrl === "");
  }, [serverUrl]);

  const resetForm = () => {
    setSelectedServerDesc("");
    setDescription("");
    setServerUrl("");
    setVariables([]);
  };

  const handleOnSave = () => {
    const mappedServerVariables = convertToServerVariableItems(variables);
    dispatch(
      addServer({
        url: serverUrl,
        description,
        variables: mappedServerVariables,
      })
    );
    resetForm();
  };

  const handleOnCancel = () => {
    resetForm();
  };

  return (
    <Paper
      sx={{
        padding: "5%",
        marginTop: "5%",
      }}
    >
      <Typography variant="h5" color="#1976d2" sx={{ marginBottom: "2%" }}>
        Add Server
      </Typography>
      <form id="add-server-form">
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <TextField
              id="server-description"
              name="Server Description"
              sx={{ width: "40%" }}
              inputProps={{
                "data-testid": "server-name",
              }}
              size="small"
              variant="outlined"
              label="Description"
              placeholder="Development"
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
            />
            <TextField
              id="server-url"
              name="Server URL"
              size="small"
              fullWidth
              inputProps={{
                "data-testid": "server-url",
              }}
              label="URL"
              placeholder="http://dev.swagger.io"
              value={serverUrl}
              onChange={(e) => setServerUrl(e.currentTarget.value)}
            ></TextField>
          </Stack>
          <ServerURLVariables
            serverUrl={serverUrl}
            disableVarAdd={disableVarAdd}
            testID="server-vars-component"
            variables={variables}
            setVariables={setVariables}
          />
          <Stack direction="row-reverse" spacing={2}>
            <Button
              data-testid="save-btn"
              onClick={handleOnSave}
              sx={{ width: "25%" }}
              variant="contained"
              startIcon={<SaveIcon />}
            >
              SAVE
            </Button>
            {selectedServerDesc && (
              <Button
                onClick={handleOnCancel}
                sx={{ width: "25%" }}
                variant="contained"
              >
                CANCEL
              </Button>
            )}
          </Stack>
        </Stack>
      </form>
      <ExistingServers
        servers={savedServers}
        onSelection={setSelectedServerDesc}
      />
    </Paper>
  );
}

import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ListDisplay from "./ListDisplay";
import ServerURLVariables, {
  SimpleServerVariable,
} from "./servers/ServerURLVariables";
import { useAppDispatch } from "../data/hooks";
import { addServer } from "../data/slices/projectSlice";
import { convertToServerVariableItems } from "../converters/ServerVariableConverter";
import { ExistingServers } from "./servers/ExistingServers";

export default function ServersPage() {
  const [selectedServerDesc, setSelectedServerDesc] = useState("");
  const [description, setDescription] = useState("");
  const [serverUrl, setServerUrl] = useState("");
  const [variables, setVariables] = useState<SimpleServerVariable[]>([]);
  const dispatch = useAppDispatch();

  const resetForm = () => {
    setSelectedServerDesc("");
    setDescription("");
    setServerUrl("");
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
      <form>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <TextField
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
            testID="server-vars-component"
            variables={variables}
            setVariables={setVariables}
          />
          <Stack direction="row-reverse">
            <Button
              data-testid="save-btn"
              onClick={handleOnSave}
              sx={{ width: "25%" }}
              variant="contained"
            >
              SAVE
            </Button>
          </Stack>
          <ExistingServers />
        </Stack>
      </form>
    </Paper>
  );
}

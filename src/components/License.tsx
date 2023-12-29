import { Button, Paper, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../data/hooks";
import { updateLicense } from "../data/slices/projectSlice";
import { LicenseEntity } from "../models/SwaggerModels";

const License = () => {
  const [name, setName] = useState<string>();
  const [url, setUrl] = useState<string>();

  const license = useAppSelector((state) => state.project.info.license);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setName(license.name);
    setUrl(license.url);
  }, [license.name, license.url]);

  const handleOnSave = () => {
    dispatch(updateLicense({ name, url } as LicenseEntity));
  };

  return (
    <Paper sx={{ padding: "5%", marginTop: "5%" }}>
      <h2>License</h2>
      <form>
        <Stack spacing={2}>
          <TextField
            inputProps={{
              "data-testid": "lic-name",
            }}
            sx={{ width: "50%" }}
            size="small"
            variant="outlined"
            label="Name"
            placeholder="Apache 2.0"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <TextField
            inputProps={{
              "data-testid": "lic-url",
            }}
            size="small"
            fullWidth
            label="URL"
            placeholder="http://www.apache.org/licenses/LICENSE-2.0.html"
            value={url}
            onChange={(e) => setUrl(e.currentTarget.value)}
          ></TextField>
          <Button
            onClick={handleOnSave}
            variant="contained"
            sx={{ width: "20%" }}
          >
            SAVE
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default License;

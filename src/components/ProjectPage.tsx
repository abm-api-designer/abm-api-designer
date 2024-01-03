import { Button, Paper, Stack, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../data/hooks";
import { useEffect, useState } from "react";
import { updateProject } from "../data/slices/projectSlice";
import CustomSnackBar from "./common/SnackBar";
import SaveIcon from "@mui/icons-material/Save";

export default function ProjectPage() {
  const dispatch = useAppDispatch();
  const project = useAppSelector((state) => state.info);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [version, setVersion] = useState("");
  const [termsOfService, setTermsOfService] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setTitle(project.title);
    setDescription(project.description);
    setVersion(project.version);
    setTermsOfService(project.termsOfService);
    setContactEmail(project.contact.email);
  }, [project]);

  const handleOnSave = () => {
    dispatch(
      updateProject({
        title,
        description,
        version,
        termsOfService,
        contactEmail,
      })
    );
    setMessage("Details saved successfully.");
  };

  return (
    <Paper sx={{ padding: "5%", marginTop: "5%" }}>
      <h2>Project</h2>
      <form>
        <Stack id="form-container" spacing={2}>
          <TextField
            name="title"
            fullWidth
            inputProps={{
              "data-testid": "project-title",
            }}
            variant="outlined"
            label="Title"
            placeholder="Enter title of the project"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <TextField
            name="description"
            fullWidth
            multiline
            rows={4}
            inputProps={{
              "data-testid": "project-desc",
            }}
            // maxRows={4}
            label="Description"
            placeholder="Mention few words about the project"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          ></TextField>
          <Stack direction="row" spacing={1}>
            <TextField
              name="version"
              sx={{ width: "30%" }}
              inputProps={{
                "data-testid": "project-version",
              }}
              size="small"
              label="Version"
              placeholder="1.0.0"
              value={version}
              onChange={(e) => setVersion(e.currentTarget.value)}
            />
            <TextField
              name="termsOfService"
              inputProps={{
                "data-testid": "project-tos",
              }}
              sx={{ width: "70%" }}
              size="small"
              label="Terms of Service"
              placeholder="http://swagger.io/terms/"
              value={termsOfService}
              onChange={(e) => setTermsOfService(e.currentTarget.value)}
            />
          </Stack>
          <TextField
            name="contact"
            inputProps={{
              "data-testid": "project-contact",
            }}
            sx={{ width: "50%" }}
            label="Contact"
            placeholder="apiteam@swagger.io"
            size="small"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.currentTarget.value)}
          />
          <Stack
            id="action-buttons"
            direction="row"
            spacing={1}
            alignSelf={"end"}
          >
            <Button
              data-testid="save-btn"
              variant="contained"
              onClick={handleOnSave}
              startIcon={<SaveIcon />}
            >
              SAVE
            </Button>
          </Stack>
        </Stack>
        <CustomSnackBar message={message} />
      </form>
    </Paper>
  );
}

import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ListDisplay from "./ListDisplay";
import { useAppDispatch, useAppSelector } from "../data/hooks";
import { addTag } from "../data/slices/projectSlice";
import { Tag } from "../models/SwaggerModels";
import CustomSnackBar from "./common/SnackBar";
import SaveIcon from "@mui/icons-material/Save";

export default function TagsPage() {
  const dispatch = useAppDispatch();
  const existingTags = useAppSelector((state) => state.tags);

  const [selectedTagName, setSelectedTagName] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [externalDocURL, setExternalDocURL] = useState("");
  const [externalDocDesc, setExternalDocDesc] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedTagName) {
      const foundTag = existingTags.find(
        (item) => item.name === selectedTagName
      );
      if (foundTag) {
        setName(foundTag.name);
        setDescription(foundTag.description);
        setExternalDocDesc(foundTag.externalDocs.description);
        setExternalDocURL(foundTag.externalDocs.url);
      }
    }
  }, [selectedTagName, existingTags]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setExternalDocDesc("");
    setExternalDocURL("");
    setSelectedTagName("");
  };

  const handleOnAdd = () => {
    const newTag: Tag = {
      name,
      description,
      externalDocs: {
        description: externalDocDesc,
        url: externalDocURL,
      },
    };
    dispatch(addTag(newTag));
    setMessage("Tag addedd succesfully");
    resetForm();
  };

  return (
    <Paper sx={{ padding: "5%", marginTop: "5%" }}>
      <Typography variant="h5" color="#1976d2">
        Create Tag
      </Typography>
      <form>
        <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
          <Typography variant="h6">Basic Information</Typography>
          <Stack direction="row" spacing={3}>
            <TextField
              sx={{ width: "50%" }}
              size="small"
              variant="outlined"
              name="tagName"
              label="Name"
              placeholder="Pet"
              disabled={selectedTagName !== ""}
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <TextField
              size="small"
              name="tagDescription"
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
              name="External Docs Description"
              size="small"
              label="Description"
              placeholder="Find out more"
              value={externalDocDesc}
              onChange={(e) => setExternalDocDesc(e.currentTarget.value)}
            />
            <TextField
              size="small"
              name="External Docs URL"
              fullWidth
              label="URL"
              placeholder="http://swagger.io"
              value={externalDocURL}
              onChange={(e) => setExternalDocURL(e.currentTarget.value)}
            ></TextField>
          </Stack>
          <Stack alignSelf="flex-end" sx={{ paddingRight: "6%", width: "25%" }}>
            <Button
              onClick={handleOnAdd}
              variant="contained"
              startIcon={<SaveIcon />}
            >
              SAVE
            </Button>
          </Stack>
        </Stack>
      </form>
      <ListDisplay
        title="Existing Tags"
        items={existingTags}
        onItemClick={(item) => setSelectedTagName(item.name)}
      />
      <CustomSnackBar message={message} />
    </Paper>
  );
}

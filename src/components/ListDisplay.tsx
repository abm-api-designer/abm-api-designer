import { Button, Stack, Typography } from "@mui/material";

export interface ListItem {
  name: string;
}
export interface ListDisplayProps {
  title: string;
  items: ListItem[];
  onItemClick: (listItem: ListItem) => void;
}

export default function ListDisplay({
  title,
  items,
  onItemClick,
}: ListDisplayProps) {
  return (
    <>
      <Typography variant="h6" color="secondary">
        {title}
      </Typography>
      <Stack direction="column">
        {items.map((item) => (
          <Button
            key={item.name}
            variant="outlined"
            color="secondary"
            sx={{ width: "fit-content" }}
            onClick={() => onItemClick(item)}
          >
            {item.name}
          </Button>
        ))}
      </Stack>
    </>
  );
}

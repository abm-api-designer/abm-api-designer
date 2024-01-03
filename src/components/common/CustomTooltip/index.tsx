import { Tooltip } from "@mui/material";

export interface CustomTooltipProps {
  title: string;
  children: React.ReactNode;
}

export default function CustomTooltip({ title, children }: CustomTooltipProps) {
  return (
    <Tooltip title={title} arrow>
      <span style={{ pointerEvents: "auto" }}>{children}</span>
    </Tooltip>
  );
}

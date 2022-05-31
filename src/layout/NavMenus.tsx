import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Menu } from "@mui/material";
import MenuSectionTitle from "./MenuSectionTitle";
import { Link } from "react-router-dom";

export interface NavMenuItem {
  text: string;
  icon?: React.ReactNode;
  type: "separator" | "menu";
  link: string;
}

export interface NavMenusProps {
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
  items: NavMenuItem[];
}

export default function NavMenus({
  anchorEl,
  setAnchorEl,
  items,
}: NavMenusProps) {
  //   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  //   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //     setAnchorEl(event.currentTarget);
  //   };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper sx={{ width: 320, maxWidth: "100%" }}>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        {items.map((item) => {
          if (item.type === "menu") {
            return (
              <Link
                style={{ textDecoration: "none", color: "gray" }}
                key={item.text}
                to={item.link}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.text}</ListItemText>
                </MenuItem>
              </Link>
            );
          } else {
            return (
              <div key={item.text}>
                <MenuSectionTitle text={item.text} />
                <Divider />
              </div>
            );
          }
        })}
      </Menu>
    </Paper>
  );
}

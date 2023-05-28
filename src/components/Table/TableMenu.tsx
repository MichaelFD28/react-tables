import { Button as MuiButton, Menu, MenuItem } from "@mui/material";
import { DotsThreeOutlineVertical } from "phosphor-react";
import { useState } from "react";

export type TableMenuItem = {
  key: string;
  onClick?: () => void;
  icon: JSX.Element;
  text: string;
};

export type TableMenuProps = {
  menuItems: TableMenuItem[];
};

const TableMenu: React.FC<TableMenuProps> = ({ menuItems }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <MuiButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <DotsThreeOutlineVertical
          size={16}
          weight="fill"
          className="text-black"
        />
      </MuiButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          disablePadding: true,
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        disableScrollLock={true}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.key}
            onClick={() => {
              item.onClick && item.onClick();
              handleClose();
            }}
            sx={{
              "&:hover": { backgroundColor: "#ADD53A" },
              height: 48,
            }}
          >
            <div className="flex flex-row items-center">
              <div>{item.icon}</div>
              <div className="pl-3">{item.text}</div>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default TableMenu;

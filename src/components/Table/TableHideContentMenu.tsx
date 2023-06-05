import { useState } from "react";
import { type HiddenCols, type TableHeader } from "./tableTypes";
import { Button, Menu, MenuItem } from "@mui/material";
import { NestedMenuItem } from "mui-nested-menu";
import { CaretRight, Eye, EyeClosed, Gear } from "phosphor-react";

export type TableHideContentMenuProps = {
  menuGroups: string[];
  hiddenCols: HiddenCols[];
  setHiddenCols: (
    value: HiddenCols[] | ((val: HiddenCols[]) => HiddenCols[])
  ) => void;
  tableHeaders: TableHeader[];
};

const TableHideContentMenu: React.FC<TableHideContentMenuProps> = ({
  menuGroups,
  hiddenCols,
  setHiddenCols,
  tableHeaders,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHiddenCols = (id: string) => {
    const index = hiddenCols.findIndex((item) => item.id === id);
    setHiddenCols((prevHiddenCols) => {
      return [
        ...prevHiddenCols.slice(0, index),
        {
          id: id,
          hidden: !prevHiddenCols[index].hidden,
        },
        ...prevHiddenCols.slice(index + 1, hiddenCols.length),
      ];
    });
  };

  const handleColumnToggle = (id: string) => {
    handleHiddenCols(id);
    handleClose();
  };

  const findHiddenContent = (id: string) => {
    const hidden = hiddenCols.find((c) => c.id === id)?.hidden;
    return hidden;
  };
  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Gear
          size={16}
          className="hover:cursor-pointer text-[#FFFFFF]"
          weight="fill"
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          disablePadding: true,
        }}
        disableScrollLock={true}
      >
        {menuGroups.map((g) => (
          <NestedMenuItem
            rightIcon={<CaretRight size={20} weight="fill" />}
            label={g}
            key={g}
            parentMenuOpen={open}
            nonce={undefined}
            sx={{
              "&:hover": {
                backgroundColor: "#5EEAD4",
              },
              width: 228,
              height: 48,
              paddingRight: 2,
            }}
            MenuProps={{
              anchorOrigin: {
                vertical: "center",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "center",
                horizontal: "right",
              },
            }}
          >
            {tableHeaders
              .filter((h: TableHeader) => h.menuGroup === g)
              .map((h: TableHeader) => (
                <MenuItem
                  onClick={() => handleColumnToggle(h.id)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#5EEAD4",
                    },
                    height: 48,
                  }}
                  key={h.id}
                  disabled={h.id === "name"}
                >
                  <>
                    <div className="flex w-52 justify-between text-black">
                      <div>{h.title}</div>
                      {h.id === "name" ? (
                        <div>
                          <Eye size={20} weight="fill" opacity={40} />
                        </div>
                      ) : (
                        <div>
                          {findHiddenContent(h.id) ? (
                            <EyeClosed size={20} weight="fill" />
                          ) : (
                            <Eye size={20} weight="fill" />
                          )}
                        </div>
                      )}
                    </div>
                  </>
                </MenuItem>
              ))}
          </NestedMenuItem>
        ))}
      </Menu>
    </>
  );
};

export default TableHideContentMenu;

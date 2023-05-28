import { Eye, Trash } from "phosphor-react";

export const userDetailsTableMenuItems = (userId: string) => {
  return [
    {
      key: "view",
      onClick: () => alert(`View user ${userId}`),
      icon: <Eye size={20} weight="fill" />,
      text: "View user",
    },
    {
      key: "delete",
      onClick: () => alert(`Delete user ${userId}`),
      icon: <Trash size={20} weight="fill" />,
      text: "Delete user",
    },
  ];
};

export const userDetailsMenuGroups = ["User details", "Account details"];

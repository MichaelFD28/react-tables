import { type TableContent, type TableHeader } from "../Table";
import { UserDetails } from "../../models/mockData";
import { formatDateToString } from "../../utils/formatDateToString";
import clsx from "clsx";

export type UserDetailsTableAllowedIds =
  | "name"
  | "followers"
  | "dateOfBirth"
  | "accountCreated"
  | "lastLoggedIn"
  | "accountType";

export type UserDetailsTableHeader = TableHeader<UserDetailsTableAllowedIds>;
export type UserDetailsTableContent = TableContent<UserDetailsTableAllowedIds>;

export const initUserDetailsTableHeaders: UserDetailsTableHeader[] = [
  {
    title: `Name`,
    id: "name",
    menuGroup: `User details`,
  },
  {
    title: `Follower count`,
    id: "followers",
    menuGroup: `User details`,
  },
  {
    title: "Date of birth",
    id: "dateOfBirth",
    menuGroup: `User details`,
  },
  {
    title: "Account created",
    id: "accountCreated",
    menuGroup: `Account details`,
  },
  {
    title: "Last logged in",
    id: "lastLoggedIn",
    menuGroup: "Account details",
  },
  {
    title: "Account type",
    id: "accountType",
    menuGroup: "Account details",
  },
];

export function initUserDetailsTableContents(
  items: UserDetails[]
): UserDetailsTableContent[] {
  const tableContents = new Array(0);
  items.map((item) => {
    tableContents.push({
      id: item.userId,
      cellData: [
        {
          id: "name",
          content: (
            <div className="flex gap-2 items-center">
              <p className="max-w-[160px] overflow-ellipsis whitespace-nowrap overflow-hidden">
                {item.firstName} {item.lastName}
              </p>
            </div>
          ),
        },
        {
          id: "followers",
          content: (
            <div className="px-2 flex max-w-fit justify-center h-7 whitespace-nowrap items-center rounded-md bg-teal-300">
              {item.followers}
            </div>
          ),
        },
        {
          id: "dateOfBirth",
          content: <p>{formatDateToString(item.dateOfBirth)}</p>,
        },
        {
          id: "accountCreated",
          content: <p>{formatDateToString(item.accountCreated)}</p>,
        },
        {
          id: "lastLoggedIn",
          content: <p>{formatDateToString(item.lastLoggedIn, true)}</p>,
        },
        {
          id: "accountType",
          content: (
            <div
              className={clsx(
                "px-2 flex max-w-fit justify-center h-7",
                "whitespace-nowrap items-center rounded-md",
                item.accountType === "Professional" && "bg-teal-500",
                item.accountType === "Amateur" && "bg-orange-400"
              )}
            >
              {item.accountType}
            </div>
          ),
        },
      ],
    });
  });
  return tableContents;
}

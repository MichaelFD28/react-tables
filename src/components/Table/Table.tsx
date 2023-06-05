import clsx from "clsx";
import TableMenu, { type TableMenuItem } from "./TableMenu";
import { useDraggableTableHeaders } from "./tableUtils";
import TableHideContentMenu from "./TableHideContentMenu";
import {
  HiddenCols,
  TableCellData,
  TableContent,
  TableHeader,
} from "./tableTypes";
import { ArrowCircleDown, ArrowCircleUp } from "phosphor-react";

export type TableProps = {
  tableHeaders: TableHeader[];
  setTableHeaders: (
    value: TableHeader[] | ((val: TableHeader[]) => TableHeader[])
  ) => void;
  tableContents: TableContent[];
  hiddenCols?: HiddenCols[];
  setHiddenCols?: (
    value: HiddenCols[] | ((val: HiddenCols[]) => HiddenCols[])
  ) => void;
  menuItems?: (id: string) => TableMenuItem[];
  menuGroups?: string[];
  sortOrder?: "asc" | "desc";
  orderByOptions?: string[];
  handleSortColumn?: (orderBy: string) => void;
};

const Table: React.FC<TableProps> = ({
  tableHeaders,
  setTableHeaders,
  tableContents,
  hiddenCols,
  setHiddenCols,
  menuItems,
  menuGroups,
  sortOrder,
  orderByOptions,
  handleSortColumn,
}) => {
  const { handleDragStart, handleDragEnter, handleDragEnd } =
    useDraggableTableHeaders(tableHeaders, setTableHeaders);

  //basing cell content off of the id position in the table headers array
  const findCellContent = (item: TableCellData[], headerId: string) => {
    const tableCellContent = item.find(
      (tableCellContent: TableCellData) => tableCellContent.id === headerId
    );

    return tableCellContent;
  };

  const findHiddenContent = (id: string) => {
    if (!hiddenCols) return false;

    const hidden = hiddenCols.find((c) => c.id === id)?.hidden;
    return hidden;
  };

  const canOrderBy = (id: string) => {
    if (orderByOptions?.includes(id)) return true;
    return false;
  };

  return (
    <div className="grid place-items-end overflow-x-auto border border-black rounded-md">
      <table className="w-full min-w-max divide-y-[2px] divide-black bg-neutral-800 rounded-md">
        <thead>
          <tr>
            <td className="m-auto py-6" />
            {tableHeaders
              .filter((header) => findHiddenContent(header.id) === false)
              .map((header: TableHeader) => (
                <th
                  scope="col"
                  key={`${header.id}Header`}
                  className={clsx(
                    "text-left text-sm px-2 font-semibold bg-neutral-800 text-neutral-100 m-auto rounded-md",
                    "hover:cursor-pointer"
                  )}
                  draggable
                  onDragStart={(e) => handleDragStart(e, header.id)}
                  onDragEnter={(e) => handleDragEnter(e, header.id)}
                  onDragEnd={() => handleDragEnd()}
                >
                  <div
                    className="flex justify-between pr-2"
                    onClick={() =>
                      handleSortColumn && handleSortColumn(header.id)
                    }
                  >
                    {header.title}
                    {canOrderBy(header.id) && (
                      <>
                        {sortOrder === "asc" && (
                          <ArrowCircleUp
                            size={18}
                            weight="fill"
                            color="white"
                          />
                        )}
                        {sortOrder === "desc" && (
                          <ArrowCircleDown
                            size={18}
                            weight="fill"
                            color="white"
                          />
                        )}
                      </>
                    )}
                  </div>
                </th>
              ))}
            {hiddenCols && setHiddenCols && menuGroups && (
              <th
                scope="col"
                key="menuHeader"
                className={clsx(
                  "text-left text-sm font-semibold bg-neutral-800 text-neutral-100 m-auto rounded-md"
                )}
              >
                <TableHideContentMenu
                  hiddenCols={hiddenCols}
                  setHiddenCols={setHiddenCols}
                  tableHeaders={tableHeaders}
                  menuGroups={menuGroups}
                />
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-neutral-100 divide-y-[2px] divide-neutral-600 m-auto">
          {tableContents.map((item) => (
            <tr key={item.id} className=" hover:bg-teal-50">
              <td key="checkboxContent">
                <div className="my-6 flex mx-2" />
              </td>
              {tableHeaders
                .filter((header) => findHiddenContent(header.id) === false)
                .map((header: TableHeader) => (
                  <td
                    key={`${header.id}Content`}
                    className={clsx("py-1 px-2 text-left text-sm")}
                  >
                    {findCellContent(item.cellData, header.id)?.content}
                  </td>
                ))}
              {menuItems && (
                <td key="menuContent">
                  <div className="my-1 flex justify-end">
                    <TableMenu menuItems={menuItems(item.id)} />
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

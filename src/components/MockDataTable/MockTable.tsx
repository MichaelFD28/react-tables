import { Eye, Trash } from "phosphor-react";
import { useMockUserDetails } from "../../api/mockTableData";
import useLocalStorage from "../../hooks/useLocalStorage";
import Table, { HiddenCols, type TableHeader } from "../Table";
import PaginationNav from "../TablePagination";
import {
  initUserDetailsTableContents,
  initUserDetailsTableHeaders,
} from "./mockDataTableInit";
import {
  userDetailsMenuGroups,
  userDetailsTableMenuItems,
} from "./MockTableOptions";

const MockTable = () => {
  const { mockTableData, isLoadingMockTableData } = useMockUserDetails();

  const [tableHeaders, setTableHeaders] = useLocalStorage<TableHeader[]>(
    "MockDataTableHeaders",
    initUserDetailsTableHeaders
  );

  const [pageNumber, setPageNumber] = useLocalStorage<number>(
    "UserDetailsPageNumber",
    mockTableData?.pageNumber ?? 1
  );

  const [pageSize, setPageSize] = useLocalStorage<number>(
    "UserDetailsPageSize",
    15
  );

  const initHiddenCols = new Array(0);
  tableHeaders.map((item) =>
    initHiddenCols.push({
      id: item.id,
      hidden: item.hide ?? false,
    })
  );

  const [hiddenCols, setHiddenCols] = useLocalStorage<HiddenCols[]>(
    "userDetailsTableHiddenCols",
    initHiddenCols
  );

  return (
    <>
      {isLoadingMockTableData && <p>...loading</p>}
      {mockTableData && (
        <>
          <Table
            tableHeaders={tableHeaders}
            setTableHeaders={setTableHeaders}
            tableContents={initUserDetailsTableContents(mockTableData.items)}
            menuItems={userDetailsTableMenuItems}
            hiddenCols={hiddenCols}
            setHiddenCols={setHiddenCols}
            menuGroups={userDetailsMenuGroups}
          />
          <PaginationNav
            setPageNumber={setPageNumber}
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalCount={mockTableData.totalCount}
            totalPages={mockTableData.totalPages}
            currentPage={pageNumber}
            hasPreviousPage={mockTableData.hasPreviousPage}
            hasNextPage={mockTableData.hasNextPage}
          />
        </>
      )}
    </>
  );
};

export default MockTable;

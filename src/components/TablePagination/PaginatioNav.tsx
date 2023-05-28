import {
  CaretDoubleLeft,
  CaretLeft,
  CaretRight,
  CaretDoubleRight,
} from "phosphor-react";
import FormDropdown, { FormDropdownOption } from "./PaginationNavDropdown";
import clsx from "clsx";

export type PaginationNavProps = {
  setPageNumber: (value: number | ((val: number) => number)) => void;
  pageSize: number;
  setPageSize: (value: number | ((val: number) => number)) => void;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
};

const PaginationNav: React.FC<PaginationNavProps> = ({
  setPageNumber,
  pageSize,
  setPageSize,
  totalCount,
  totalPages,
  currentPage,
  hasPreviousPage = false,
  hasNextPage = false,
}) => {
  const handlePageSizeSelect = (
    value: string | number,
    option: FormDropdownOption<string | number>
  ) => {
    setPageSize(Number(value));
  };

  const pageSizeOptions = [15, 25, 50, 75, 100];
  const options: FormDropdownOption<string | number>[] = pageSizeOptions.map(
    (o: number) => ({
      label: o.toString(),
      value: o,
    })
  );

  const handlePageNavigate = (pageNav: string) => {
    if (pageNav === "first") {
      setPageNumber(1);
    }
    if (pageNav === "previous" && hasPreviousPage) {
      setPageNumber(currentPage - 1);
    }
    if (pageNav === "next" && hasNextPage) {
      setPageNumber(currentPage + 1);
    }
    if (pageNav === "last") {
      setPageNumber(totalPages);
    }
  };

  const lastRow = () => {
    if (currentPage === totalPages) {
      return totalCount;
    }
    return currentPage * pageSize;
  };

  const firstRow = pageSize * currentPage - pageSize + 1;

  return (
    <div className="flex sm:flex-row flex-col justify-end py-2 gap-7 items-center text-sm">
      <div className="flex flex-row justify-end py-2 gap-7 items-center text-sm">
        <div>Rows per page</div>
        <FormDropdown
          className="w-24 font-bold"
          options={options}
          value={pageSize}
          onChange={handlePageSizeSelect}
          buttonClassName="border-teal-500 bg-neutral-100"
          optionsAboveButton={true}
        />
        <div>
          {firstRow} - {lastRow()} of {totalCount}
        </div>
      </div>
      <div className="flex flex-row justify-end py-2 gap-7 items-center text-sm">
        <CaretDoubleLeft
          size={24}
          weight="fill"
          className={clsx(
            "hover:cursor-pointer",
            !hasPreviousPage && "text-gray-400 hover:cursor-not-allowed"
          )}
          onClick={() => handlePageNavigate("first")}
        />
        <CaretLeft
          size={24}
          weight="fill"
          className={clsx(
            "hover:cursor-pointer",
            !hasPreviousPage && "text-gray-400 hover:cursor-not-allowed"
          )}
          onClick={() => handlePageNavigate("previous")}
        />
        <CaretRight
          size={24}
          weight="fill"
          className={clsx(
            "hover:cursor-pointer",
            !hasNextPage && "text-gray-400 hover:cursor-not-allowed"
          )}
          onClick={() => handlePageNavigate("next")}
        />
        <CaretDoubleRight
          size={24}
          weight="fill"
          className={clsx(
            "hover:cursor-pointer",
            !hasNextPage && "text-gray-400 hover:cursor-not-allowed"
          )}
          onClick={() => handlePageNavigate("last")}
        />
      </div>
    </div>
  );
};

export default PaginationNav;

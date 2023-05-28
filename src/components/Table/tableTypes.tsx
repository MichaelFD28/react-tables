export type TableHeader<AllowedIds = string> = {
  title: string | React.ReactNode;
  id: AllowedIds;
  hide?: boolean;
  orderBy?: string;
  menuGroup?: string;
};

export type TableCellData<AllowedIds = string> = {
  content: string | JSX.Element;
  id: AllowedIds;
};

export type TableContent<AllowedIds = string> = {
  id: string;
  cellData: TableCellData<AllowedIds>[];
};

export type HiddenCols = {
  id: string;
  hidden: boolean;
};

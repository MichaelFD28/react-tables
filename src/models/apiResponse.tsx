export type ApiPaginatedResponse<DataModel> = {
  items: DataModel;
  totalCount: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

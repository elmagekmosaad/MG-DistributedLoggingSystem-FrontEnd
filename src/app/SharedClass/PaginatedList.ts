export interface PaginatedList<T> {
    items: T[];
    totalCount: number;
    pageIndex: number;
    totalPages: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }  
import type { NotificationProps } from '@types';

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface TableProps {
  data: NotificationProps[];
}

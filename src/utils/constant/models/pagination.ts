import { PagingData, pagingEvent } from '../../../models/Pagination.model';
import { DEFAULT_PAGINATION } from '../Pagination';

export const initialPagingData: PagingData<any> = {
  list: [],
  total: 0
};

export const initialPagingEvent: pagingEvent = {
  page: 1,
  limit: DEFAULT_PAGINATION.limit
};
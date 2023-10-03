import { PagingData, pagingEvent } from '../../../models/Pagination.model';
import { default_pagination } from '../pagination';

export const initialPagingData: PagingData<any> = {
  list: [],
  total: 0
};

export const initialPagingEvent: pagingEvent = {
  page: 1,
  limit: default_pagination.limit
};
export interface PagingData<T> {
  list: T[];
  total: number;
}

export interface pagingEvent {
  page: number;
  limit: number;
}

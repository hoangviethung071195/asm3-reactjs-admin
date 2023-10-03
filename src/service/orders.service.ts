import { PagingData } from 'models/Pagination.model';
import { Sort } from 'models/Table.model';
import { stringifyUrl } from 'query-string';
import { DEFAULT_PAGINATION } from 'utils/constant/Pagination';
import { OrderModel } from '../models/Order.model';
import { ORDER_PATH, PLURAL } from '../utils/constant/ApiPath';
import { requestJson } from '../utils/helpers/api';

export function getOrders(page = DEFAULT_PAGINATION.page, limit = DEFAULT_PAGINATION.limit, sort: Sort = 'desc', sortBy: keyof OrderModel = 'createdAt') {
  const path = stringifyUrl({
    url: ORDER_PATH + PLURAL,
    query: {
      page,
      limit,
      sort,
      sortBy
    }
  });
  return requestJson<PagingData<OrderModel>>(path);
}

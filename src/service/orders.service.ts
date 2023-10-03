import { PagingData } from 'models/Pagination.model';
import { Sort } from 'models/Table.model';
import { stringifyUrl } from 'query-string';
import { default_pagination } from 'utils/constant/pagination';
import { OrderModel } from '../models/Order.model';
import { ORDER_PATH, PLURAL } from '../utils/constant/apiPath';
import { requestJson } from '../utils/helpers/api';

export function getOrders(page = default_pagination.page, limit = default_pagination.limit, sort: Sort = 'desc', sortBy: keyof OrderModel = 'createdAt') {
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

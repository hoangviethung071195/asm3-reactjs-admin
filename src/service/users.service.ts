import { PagingData } from 'models/Pagination.model';
import { UserModel } from '../models/User.model';
import { PLURAL, USER_PATH } from '../utils/constant/apiPath';
import { RequestMethod } from '../utils/constant/requestMethod';
import { requestJson } from '../utils/helpers/api';
import { getValuableFieldsObj } from 'utils/helpers/object';
import queryString from 'query-string';
import { default_pagination } from 'utils/constant/pagination';

export function getUser(userId: string) {
  return requestJson<UserModel>(USER_PATH + userId);
}

export async function getUsers(page = default_pagination.page, limit = default_pagination.limit) {
  const query = getValuableFieldsObj({
    page,
    limit,
  });
  const url = queryString.stringifyUrl({
    url: USER_PATH + PLURAL,
    query
  });
  return requestJson<PagingData<UserModel>>(url);
}

export async function updateUser(body: UserModel) {
  return requestJson<boolean>(USER_PATH, RequestMethod.Post, body);
}

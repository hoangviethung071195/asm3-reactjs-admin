import { PagingData } from 'models/Pagination.model';
import { UserModel } from '../models/User.model';
import { PLURAL, USER_PATH } from '../utils/constant/apiPath';
import { RequestMethod } from '../utils/constant/requestMethod';
import { requestJson } from '../utils/helpers/api';

export function getUser(userId: string) {
  return requestJson<UserModel>(USER_PATH + userId);
}

export async function getUsers() {
  return requestJson<PagingData<UserModel>>(USER_PATH + PLURAL);
}

export async function updateUser(body: UserModel) {
  return requestJson<boolean>(USER_PATH, RequestMethod.Post, body);
}

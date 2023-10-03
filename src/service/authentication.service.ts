import { UserModel } from '../models/User.model';
import { RequestMethod } from '../utils/constant/requestMethod';
import { requestJson } from '../utils/helpers/api';

export function signup(body: UserModel) {
  return requestJson<UserModel>('/signup/employee', RequestMethod.Post, body);
}

export function signin(body: UserModel) {
  return requestJson<UserModel>('/login', RequestMethod.Post, body);
}

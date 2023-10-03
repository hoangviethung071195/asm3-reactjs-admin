import { UserModel } from '../models/User.model';
import { RequestMethod } from '../utils/constant/RequestMethod';
import { requestJson } from '../utils/helpers/api';

export function signup(body: UserModel) {
  return requestJson<UserModel>('/signup/employee', RequestMethod.Post, body);
}

export function signin(body: UserModel) {
  return requestJson<UserModel>('/login', RequestMethod.Post, body);
}

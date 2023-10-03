import { UserModel } from '../../models/User.model';

const currentUserKW = "currentUser";

export function updateCurrentUser(user: UserModel) {
  localStorage.setItem(currentUserKW, JSON.stringify(user));
}

export function getCurrentUser() {
  const userStringify = localStorage.getItem(currentUserKW);
  const user: UserModel = {};
  if (userStringify) {
    Object.assign(user, JSON.parse(userStringify));
  }
  return user;
}

export function removeCurrentUser() {
  localStorage.removeItem(currentUserKW);
}

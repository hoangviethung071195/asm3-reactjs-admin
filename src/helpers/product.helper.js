// các hàm lưu, lấy thông tin từ local storage
const currentUserKW = "currentUser";

export function updateCurrentUser(user) {
  localStorage.setItem(currentUserKW, JSON.stringify(user));
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(currentUserKW));
}

export function removeCurrentUser() {
  localStorage.removeItem(currentUserKW);
}

const usersKW = "users";
export function getListUsers() {
  return JSON.parse(localStorage.getItem(usersKW));
}

export function updateListUsers(users) {
  localStorage.setItem(usersKW, JSON.stringify(users));
}
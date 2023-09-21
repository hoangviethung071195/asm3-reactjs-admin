import { toast } from 'react-toastify';
import { getCurrentUser } from '../helpers/product.helper';

const domain = 'https://asm3-nodejs-me79.onrender.com/';

export function requestApi(url, method, body) {
  const { token } = getCurrentUser() ? getCurrentUser() : {};
  return fetch(domain + url, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  }).then(res => {
    const contentType = res.headers.get("content-type");
    console.log('contentType ', typeof (contentType));
    if (res.ok) {
      console.log('res ', res);
      if (contentType.includes('application/json')) {
        return res.json();
      } else {
        return res.text();
      }
    }
    res.json().then(info => {
      toast.warning(info.message);
    });
    return false;
  });

}

export function requestFile(url, method, body) {
  const { token } = getCurrentUser() ? getCurrentUser() : {};
  return fetch(domain + url, {
    method,
    body: (body),
    headers: {
      'Authorization': token,
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    res.json().then(info => {
      toast.warning(info.message);
    });
    return false;
  });

}

export function createProduct(body) {
  return requestFile('admin/add-product', 'POST', body);
}

// Auth
export function signup(body) {
  return requestApi('employee/signup', 'POST', body);
}

export function signin(body) {
  return requestApi('employee/login', 'POST', body);
}

// User
export function getUser(userId) {
  return requestApi('user/' + userId, 'GET');
}

// ////////////////////////////


export async function getProducts(page) {
  return requestApi(((page || page === 0) ? `?page=${page}` : ''));
}

export async function getAdminProducts({ page, keyword }) {
  return requestApi("admin/products" + (page ? `?page=${page}` : '') + (keyword ? `?keyword=${keyword}` : ''));
}

export async function getDetailProduct(id) {
  return requestApi("products/" + id);
}

export async function deleteProduct(productId) {
  return requestApi('admin/delete-product', 'POST', { productId });
}

export async function updateProduct(body) {
  return requestFile('admin/edit-product', 'POST', body);
}

export async function getOrders() {
  return requestApi("orders");
}

export async function postMessage(body) {
  return requestApi('employee/chat-room', 'POST', body);
}

export async function getChatRoom(customerId) {
  return requestApi('employee/chat-room/' + customerId, 'GET');
}

export async function getChatRooms() {
  return requestApi('employee/chat-room', 'GET');
}

export async function getUsers() {
  return requestApi('admin/users', 'GET');
}

export async function updateRoleUser(body) {
  return requestApi('admin/user/role', 'POST', body);
}
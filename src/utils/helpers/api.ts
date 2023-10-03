import { toast } from 'react-toastify';
import { API_ENDPOINT } from '../constant/env';
import { getCurrentUser } from './local-storage';
import { RequestMethod } from '../constant/RequestMethod';

async function request<Result>(url: string, method: RequestMethod = RequestMethod.Get, body?: BodyInit): Promise<Result> {
  const { token = '' } = getCurrentUser() ? getCurrentUser() : {};
  const headers: HeadersInit = {
    Authorization: token,
  };

  if (!(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(API_ENDPOINT + url, {
    method,
    body,
    headers
  });

  if (!res.ok) {
    return res.json().then(info => {
      toast.warning(info.message);
      return false as Result;
    });
  }

  const contentType = res.headers.get("content-type");
  if (contentType?.includes('application/json'))
    return res.json();
  else
    return res.text() as Result;

}

export function requestJson<Result>(url: string, method?: RequestMethod, body?: Object): Promise<Result> {
  return request<Result>(url, method, JSON.stringify(body));
}

export function requestForm<Result>(url: string, body: FormData): Promise<Result> {
  return request<Result>(url, RequestMethod.Post, body);
}
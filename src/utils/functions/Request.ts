import queryString from 'query-string';
import axios from './Axios';
// import {setAccessToken} from '../../storage';

export const buildURL = (url: string, query?: any) => {
  let _url = url;
  if (query) {
    _url += /\?/.test(url) ? '&' : '?';
    if (typeof query === 'object') {
      _url += queryString.stringify(query);
    } else {
      _url += query;
    }
  }
  return _url;
};

interface Props {
  method?: string;
  url: string;
  query?: any;
  params?: any;
  success: (value?: any) => void;
  failure: (value?: any) => void;
  headers?: any;
}

async function request({
  method = 'get',
  url,
  query,
  params,
  success,
  failure,
  headers,
}: Props) {
  if (__DEV__) {
    console.tron.log(method, buildURL(url, query), params);
  }

  if (__DEV__) {
    console.log(method, buildURL(url, query), params);
  }
  const axiosMethod = axios[method];
  if (typeof axiosMethod === 'function') {
    try {
      const result =
        method === 'get' || method === 'delete'
          ? await axiosMethod(buildURL(url, query), {headers})
          : await axiosMethod(buildURL(url, query), params, {headers});
      if (result.status === 200 || result.status === 201) {
        if (typeof success === 'function') {
          return success(result.data);
        }
      } else if (typeof failure === 'function') {
        console.log(result);
        return failure({
          message: result?.data,
        });
      }
    } catch (err) {
      console.log('[Request error]', err, JSON.stringify(err));
      const result = err?.toJSON?.();
      if (typeof failure === 'function') {
        if (err?.response?.data) {
          return failure({
            ...err?.response?.data,
            status: err?.response?.status,
          });
        }
        return failure({
          message: result?.message,
        });
      }
    }
  }
}

export {request};

import { mergeMap, of, switchMap, Observable, retry, catchError } from 'rxjs';

export function commonRequest$<T = any>(
  method: 'post' | 'get' | 'delete' | 'put' | 'patch' | 'meta',
  o: {
    entkey: string;
    entid?: string | number;
    params?: {
      [key: string]: string | string[];
    };
    query?: string;
    limit?: string | number;
    offset?: string | number;
    search?: string;
    urlApi?: string;
    body?: Object;
    messageLoad?: string;
    messageError?: string;
    messageSuccess?: string;
    isSilent?: boolean;
  }
): Observable<T> {
  // console.warn(o);
  const HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };
  const isSilent = o.isSilent ?? false;
  // const messageSuccess = o.messageSuccess ?? 'Успешно'
  const messageError = o.messageError ?? 'Ошибка при обращении к серверу';
  const messageLoad = o.messageLoad ?? 'Загрузка данных';
  const path = 'http://localhost:3005';
  const urlApi = o.urlApi ?? 'webapi';
  const url = `/${urlApi}/${o.entkey}` + (o.entid ? `/${o.entid}/` : '');
  const paramsObj = o.params || {};
  let paramsJoin: string = '';

  for (let param in o.params) {
    paramsObj[param] = o.params[param];
  }
  ['search', 'offset', 'limit', 'query'].forEach((param: string) => {
    const paramValue = o[param as keyof typeof o];
    if (paramValue) paramsObj[param] = String(o[param as keyof typeof o]);
  });
  for (let param in paramsObj) {
    paramsJoin = `${paramsJoin}${param}=${paramsObj[param]}&`;
  }
  if (paramsJoin.length) paramsJoin = `?${paramsJoin}`.slice(0, paramsJoin.length);

  return of(o.entkey).pipe(
    switchMap(() => {
      switch (method) {
        case 'get':
        case 'meta':
          return fetch(`${path}${url}` + paramsJoin, {
            method: method,
            headers: HEADERS
          });
        default:
          return fetch(`${path}${url}`, {
            method: method,
            headers: HEADERS,
            body: JSON.stringify(o.body)
          });
      }
    }),
    mergeMap((value) => value.json()),
    retry(2),
    catchError((error: Error) => {
      console.warn(error);
      return of<any>(error);
    })
  );
}

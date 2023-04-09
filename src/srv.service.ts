import { mergeMap, of, switchMap, Observable } from 'rxjs';

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
  const params: string[] = [];
  let urlWithParams: string | null = null;

  ['search', 'offset', 'limit', 'query'].forEach((param: string, index: number) => {
    const paramValue = o[param as keyof typeof o];
    if (paramValue) params.push(`${param}=${paramValue}`);
  });
  if (params.length) urlWithParams = `${url}?${params.join('&')}`;

  return of(o.entkey).pipe(
    switchMap(() => {
      switch (method) {
        case 'get':
        case 'meta':
          return fetch(path + (urlWithParams ?? url), {
            method: method,
            headers: HEADERS
          });
        default:
          return fetch(path + (urlWithParams ?? url), {
            method: method,
            headers: HEADERS,
            body: JSON.stringify(o.body)
          });
      }
    }),
    mergeMap((value) => value.json())
  );
}

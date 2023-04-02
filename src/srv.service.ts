import { filter, map, mergeMap, of, switchMap, type Observable } from 'rxjs';

// export function getData(entkey: string) {
//   return commonRequest$<string>('get', { entkey });
// }

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
    messageLoad?: string;
    messageError?: string;
    messageSuccess?: string;
    isSilent?: boolean;
  }
): Observable<any> {
  const HEADERS = {
    'Content-Type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json'
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
      return fetch(path + (urlWithParams ?? url), {
        method: method,
        headers: HEADERS
      });
    }),
    mergeMap((value) => value.json())
  );
}

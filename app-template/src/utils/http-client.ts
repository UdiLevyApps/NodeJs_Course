import fetch from 'node-fetch';

export type HttpClient = typeof fetch;

function proxifyFetch(baseUrl: string) {
  return (url: string, ...args: any[]) => fetch(baseUrl + url, ...args);
}

const createHttpClient = (baseUrl: string): HttpClient => proxifyFetch(baseUrl) as HttpClient;

// export type FetchFnType = typeof fetch;
// function wrapFetch(): FetchFnType {
//   const wrapped = (...args: Parameters<FetchFnType>) => fetch(...args);
//   return wrapped;
// }

export { createHttpClient };

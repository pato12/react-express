export type Props = Record<string, any>;

export interface RouteNode {
  type?: string;
  path?: string;
  method?: string;
  routes?: RouteNode[];
  handle?(req, res, next);
}

export enum Elements {
  Route = 'ROUTE',
  Middleware = 'MIDDLEWARE',
  Express = 'EXPRESS',
  Root = 'ROOT',
  ErrorHandler = 'ERRORHANDLER',
}

export enum Methods {
  CHECKOUT = 'checkout',
  COPY = 'copy',
  DELETE = 'delete',
  GET = 'get',
  HEAD = 'head',
  LOCK = 'lock',
  MERGE = 'merge',
  MKACTIVITY = 'mkactivity',
  MKCOL = 'mkcol',
  MOVE = 'move',
  MSEARCH = 'm-search',
  NOTIFY = 'notify',
  OPTIONS = 'options',
  PATCH = 'patch',
  POST = 'post',
  PURGE = 'purge',
  PUT = 'put',
  REPORT = 'report',
  SEARCH = 'search',
  SUBSCRIBE = 'subscribe',
  TRACE = 'trace',
  UNLOCK = 'unlock',
  UNSUBSCRIE = 'unsubscribe',
}

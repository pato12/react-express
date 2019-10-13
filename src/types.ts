export type Props = Record<string, any>;

export interface RouteNode {
  type: string;
  path?: string;
  method?: string;
  handle?(req, res, next);
  routes?: RouteNode[];
}

export enum Elements {
  Route = "ROUTE",
  Middleware = "MIDDLEWARE",
  Express = "EXPRESS",
  Root = "ROOT",
  ErrorHandler = "ERRORHANDLER"
}

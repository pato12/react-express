import { Elements, ComponentsProps } from '@root/types';

import ErrorHandlerInstance from './ErrorHandler';
import MiddlewareInstance from './Middleware';
import ParamMiddlewareInstance from './ParamMiddleware';
import RootInstance from './Root';
import ExpressInstance from './Express';
import RouteInstance from './Route';

export function createInstance(type: Elements, props?: ComponentsProps) {
  if (type === Elements.Express) {
    return new ExpressInstance(Elements.Express, props as any);
  } else if (type === Elements.Root) {
    return new RootInstance(Elements.Root, props as any);
  } else if (type === Elements.Middleware) {
    return new MiddlewareInstance(Elements.Middleware, props as any);
  } else if (type === Elements.Route) {
    return new RouteInstance(Elements.Route, props as any);
  } else if (type === Elements.ErrorHandler) {
    return new ErrorHandlerInstance(Elements.ErrorHandler, props as any);
  } else if (type === Elements.ParamMiddleware) {
    return new ParamMiddlewareInstance(Elements.ParamMiddleware, props as any);
  } else {
    throw new Error(`${type} is not supported`);
  }
}

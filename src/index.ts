import Renderer from '@root/renderer';
import {
  Elements,
  IErrorHandlerComponent,
  IExpressComponent,
  IMiddlewareComponent,
  IRouteComponent,
  Methods,
} from '@root/types';

const Express: IExpressComponent = Elements.Express as any;
const Middleware: IMiddlewareComponent = Elements.Middleware as any;
const ParamMiddleware = Elements.ParamMiddleware as any;
const Route: IRouteComponent = Elements.Route as any;
const ErrorHandler: IErrorHandlerComponent = Elements.ErrorHandler as any;

function compile(element) {
  return Renderer.compile(Renderer.generate(element));
}

export {
  Renderer,
  Express,
  Middleware,
  ParamMiddleware,
  Route,
  ErrorHandler,
  Methods,
  compile,
};

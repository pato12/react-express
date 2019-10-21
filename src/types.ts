import * as express from 'express';
import { ReactNode } from 'react';

export type Props = Record<string, any>;

export interface RouteNode {
  type?: string;
  path?: string;
  method?: string;
  routes?: RouteNode[];
  handle?: RouteHandle | RouteHandle[];
  props?: any;
}

export enum Elements {
  Route = 'ROUTE',
  Middleware = 'MIDDLEWARE',
  ParamMiddleware = 'PARAMMIDDLEWARE',
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

  // Custom methods
  ALL = 'all', // https://expressjs.com/en/4x/api.html#router.all
}

export type RouteHandle = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => any;

type ParamHandle = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  val: any,
  name: string
) => any;

type CustomParamHandle = (param: any, option: any) => any;

type ValidatorParamHandle = (val: any) => any;

export type ErrorHandle = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => any;

export type PathProp = string | RegExp | Array<string | RegExp>;

interface BaseComponent {
  children?: ReactNode | ReactNode[];
}

interface IMiddlewareComponentProps extends BaseComponent {
  path: PathProp;
  handle: Partial<RouteHandle> | Array<Partial<RouteHandle>>;
}

export type IMiddlewareComponent = (
  props: Partial<IMiddlewareComponentProps>
) => JSX.Element;

interface IExpressComponentProps extends BaseComponent {
  path: PathProp;
}

export type IExpressComponent = (
  props: Partial<IExpressComponentProps>
) => JSX.Element;

interface IErrorHandlerComponentProp extends BaseComponent {
  handle: ErrorHandle;
}

export type IErrorHandlerComponent = (
  props: IErrorHandlerComponentProp
) => JSX.Element;

interface IRouteComponentProps extends BaseComponent {
  path: PathProp;
  method: string | Methods;
  handle: Partial<RouteHandle> | Array<Partial<RouteHandle>>;
}

export type IRouteComponent = (
  props: Partial<IRouteComponentProps>
) => JSX.Element;

interface IParamMiddlewareProps extends Omit<BaseComponent, 'children'> {
  name?: string;
  handle: Partial<ParamHandle>;
}

export type IParamMiddleware = (
  props:
    | Partial<IParamMiddlewareProps>
    | CustomParamHandle
    | ValidatorParamHandle
) => JSX.Element;

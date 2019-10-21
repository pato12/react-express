import Renderer from '@root/renderer';
import { Elements, Methods } from '@root/types';
import * as express from 'express';
import { ReactNode } from 'react';

export type PathProp = string | RegExp | Array<string | RegExp>;

interface BaseComponent {
  children?: ReactNode | ReactNode[];
}

type RouteHandle = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => any;

type ErrorHandle = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => any;

interface IMiddlewareComponentProps extends BaseComponent {
  path: PathProp;
  handle: Partial<RouteHandle>;
}

type IMiddlewareComponent = (
  props: Partial<IMiddlewareComponentProps>
) => JSX.Element;

interface IExpressComponentProps extends BaseComponent {
  path: PathProp;
}

type IExpressComponent = (
  props: Partial<IExpressComponentProps>
) => JSX.Element;

interface IErrorHandlerComponentProp extends BaseComponent {
  handle: ErrorHandle;
}

type IErrorHandlerComponent = (
  props: IErrorHandlerComponentProp
) => JSX.Element;

interface IRouteComponentProps extends BaseComponent {
  path: PathProp;
  method: string | Methods;
  handle: Partial<RouteHandle>;
}

type IRouteComponent = (props: Partial<IRouteComponentProps>) => JSX.Element;

const Express: IExpressComponent = Elements.Express as any;
const Middleware: IMiddlewareComponent = Elements.Middleware as any;
const Route: IRouteComponent = Elements.Route as any;
const ErrorHandler: IErrorHandlerComponent = Elements.ErrorHandler as any;

function compile(element) {
  return Renderer.compile(Renderer.generate(element));
}

export { Renderer, Express, Middleware, Route, ErrorHandler, Methods, compile };

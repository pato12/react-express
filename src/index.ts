import Renderer from "@root/renderer";
import { Elements, Methods } from "@root/types";

const Express = Elements.Express as any;
const Middleware = Elements.Middleware as any;
const Root = Elements.Root as any;
const Route = Elements.Route as any;
const ErrorHandler = Elements.ErrorHandler as any;

function compile(element) {
  return Renderer.compile(Renderer.generate(element));
}

export { Renderer, Express, Middleware, Root, Route, ErrorHandler, Methods, compile };

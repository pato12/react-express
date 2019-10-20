import express from "express";

import { RouteNode, Elements, Methods } from "@root/types";

const allMethods = [...Object.keys(Methods), ...Object.values(Methods)];

function generateExpressRoutes(
  routes: RouteNode[],
  baseRouter: express.Router
): express.Router {
  for (const route of routes) {
    if (
      route.type === Elements.Middleware &&
      route.path &&
      route.handle &&
      route.routes &&
      route.routes.length > 0
    ) {
      const nextBaseRouter = express.Router();

      nextBaseRouter.use(route.handle);
      baseRouter.use(
        route.path,
        generateExpressRoutes(route.routes, nextBaseRouter)
      );
    } else if (
      route.type === Elements.Middleware &&
      route.handle &&
      route.routes &&
      route.routes.length > 0
    ) {
      const nextBaseRouter = express.Router();

      nextBaseRouter.use(route.handle);
      baseRouter.use(generateExpressRoutes(route.routes, nextBaseRouter));
    } else if (
      route.type === Elements.Middleware &&
      route.path &&
      route.handle &&
      route.routes &&
      route.routes.length === 0
    ) {
      baseRouter.use(route.path, route.handle);
    } else if (route.type === Elements.Middleware && route.handle) {
      baseRouter.use(route.handle);
    } else if (
      route.type === Elements.Route &&
      route.path &&
      route.routes &&
      route.routes.length > 0
    ) {
      const nextBaseRouter = express.Router();

      baseRouter.use(
        route.path,
        generateExpressRoutes(route.routes, nextBaseRouter)
      );
    } else if (
      route.type === Elements.Route &&
      route.handle &&
      route.path &&
      route.method &&
      allMethods.includes(route.method)
    ) {
      baseRouter[Methods[route.method] || route.method](
        route.path,
        route.handle
      );
    } else if (route.type === Elements.ErrorHandler && route.handle) {
      baseRouter.use(route.handle);
    }
  }

  return baseRouter;
}

export function compileRoute(
  node: RouteNode
): express.Express | express.Router {
  const baseRouter = express.Router();

  if (node.type !== Elements.Express && node.type !== Elements.Root) {
    throw new Error("The initial node must be Express or Route");
  }

  const route = generateExpressRoutes(node.routes!, baseRouter);

  if (node.type === Elements.Express) {
    const app = express();
    app.use(node.path!, route);

    return app;
  }

  return route;
}

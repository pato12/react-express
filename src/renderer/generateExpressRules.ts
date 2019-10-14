import express from "express";

import { RouteNode, Elements } from "@root/types";

function generateExpressRoutes(
  routes: RouteNode[],
  baseRouter: express.Router
): express.Router {
  for (const route of routes) {
    if (
      route.type === Elements.Middleware &&
      route.path &&
      route.handle &&
      !route.routes
    ) {
      baseRouter.use(route.path, route.handle);
    } else if (
      route.type === Elements.Middleware &&
      route.path &&
      route.handle &&
      route.routes &&
      route.routes.length > 0
    ) {
      const nextBaseRouter = express.Router();

      nextBaseRouter.use(route.path, route.handle);

      baseRouter.use(generateExpressRoutes(route.routes, nextBaseRouter));
    } else if (
      route.type === Elements.Middleware &&
      route.handle &&
      route.routes &&
      route.routes.length > 0
    ) {
      const nextBaseRouter = express.Router();

      nextBaseRouter.use(route.handle);

      baseRouter.use(generateExpressRoutes(route.routes, nextBaseRouter));
    } else if (route.type === Elements.Middleware && route.handle) {
      baseRouter.use(route.handle);
    } else if (
      route.type === Elements.Route &&
      route.handle &&
      route.path &&
      route.method === "GET"
    ) {
      baseRouter.get(route.path, route.handle);
    } else if (
      route.type === Elements.Route &&
      route.handle &&
      route.path &&
      route.method === "POST"
    ) {
      baseRouter.post(route.path, route.handle);
    } else if (
      route.type === Elements.Route &&
      route.handle &&
      route.path &&
      route.method === "PUT"
    ) {
      baseRouter.put(route.path, route.handle);
    } else if (
      route.type === Elements.Route &&
      route.handle &&
      route.path &&
      route.method === "DELETE"
    ) {
      baseRouter.delete(route.path, route.handle);
    } else if (
      route.type === Elements.Route &&
      route.handle &&
      route.path &&
      route.method === "OPTIONS"
    ) {
      baseRouter.options(route.path, route.handle);
    }
  }

  return baseRouter;
}

function generateExpress(node: RouteNode): express.Express {
  const app = express();
  const baseRouter = express.Router();

  if (node.type !== Elements.Express) {
    throw new Error("The initial node must be Express");
  }

  baseRouter.use(generateExpressRoutes(node.routes!, baseRouter));
  app.use(baseRouter);

  return app;
}

export default generateExpress;

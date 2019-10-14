import express from "express";

import { RouteNode, Elements } from "@root/types";

function generateExpressRoutes(
  routes: RouteNode[],
  baseRouter?: express.Router
): express.Express {
  const router = baseRouter || express();

  for (const route of routes) {
    if (
      route.type === Elements.Middleware &&
      route.path &&
      route.handle &&
      !route.routes
    ) {
      router.use(route.path, route.handle);
    } else if (
      route.type === Elements.Middleware &&
      route.path &&
      route.handle &&
      route.routes &&
      route.routes.length > 0
    ) {
      const nextBaseRouter = express.Router();

      nextBaseRouter.use(route.path, route.handle);

      router.use(generateExpressRoutes(route.routes, nextBaseRouter));
    } else if (
      route.type === Elements.Middleware &&
      route.handle &&
      route.routes &&
      route.routes.length > 0
    ) {
      const nextBaseRouter = express.Router();

      nextBaseRouter.use(route.handle);

      router.use(generateExpressRoutes(route.routes, nextBaseRouter));
    } else if (route.type === Elements.Middleware && route.handle) {
      router.use(route.handle);
    } else if (
      route.type === Elements.Route &&
      route.handle &&
      route.path &&
      route.method === "GET"
    ) {
      router.get(route.path, route.handle);
    } else if (
      route.type === Elements.Route &&
      route.handle &&
      route.path &&
      route.method === "POST"
    ) {
      router.post(route.path, route.handle);
    } else if (
      route.type === Elements.Route &&
      route.handle &&
      route.path &&
      route.method === "PUT"
    ) {
      router.put(route.path, route.handle);
    } else if (
      route.type === Elements.Route &&
      route.handle &&
      route.path &&
      route.method === "DELETE"
    ) {
      router.delete(route.path, route.handle);
    } else if (
      route.type === Elements.Route &&
      route.handle &&
      route.path &&
      route.method === "OPTIONS"
    ) {
      router.options(route.path, route.handle);
    }
  }

  return router as any;
}

export default generateExpressRoutes;

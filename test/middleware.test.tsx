import React from "react";

import { Renderer, Express, Middleware, Route } from "@root/index";
import { RouteNode, Elements } from "@root/types";

const handlerMiddleware = Object.freeze(() => {});
const handlerRoute = Object.freeze(() => {});

describe("Test middlewares", () => {
  test("Test route with two childs and two global middleware", () => {
    const compiled = Renderer.compile(
      <Express>
        <Middleware handle={handlerMiddleware} />
        <Middleware handle={handlerMiddleware} />

        <Route path="/test">
          <Route method="GET" handle={handlerRoute} />
          <Route method="POST" handle={handlerRoute} />
        </Route>
      </Express>
    ) as RouteNode[];

    expect(compiled[0].type).toBe(Elements.Middleware);
    expect(compiled[0].path).toBeUndefined();
    expect(compiled[0].method).toBeUndefined();
    expect(compiled[0].handle).toBe(handlerMiddleware);

    expect(compiled[1].type).toBe(Elements.Middleware);
    expect(compiled[1].path).toBeUndefined();
    expect(compiled[1].method).toBeUndefined();
    expect(compiled[1].handle).toBe(handlerMiddleware);

    expect(compiled[2].type).toBe(Elements.Route);
    expect(compiled[2].path).toBe("/test");
    expect(compiled[2].method).toBe("GET");
    expect(compiled[2].handle).toBe(handlerRoute);

    expect(compiled[3].type).toBe(Elements.Route);
    expect(compiled[3].path).toBe("/test");
    expect(compiled[3].method).toBe("POST");
    expect(compiled[3].handle).toBe(handlerRoute);
  });

  test("Test route with two childs, one global middleware and one middleware to the routes", () => {
    const compiled = Renderer.compile(
      <Express>
        <Middleware handle={handlerMiddleware} />

        <Middleware handle={handlerMiddleware}>
          <Route path="/test">
            <Route method="GET" handle={handlerRoute} />
            <Route method="POST" handle={handlerRoute} />
          </Route>
        </Middleware>
      </Express>
    ) as RouteNode[];

    expect(compiled[0].type).toBe(Elements.Middleware);
    expect(compiled[0].path).toBeUndefined();
    expect(compiled[0].method).toBeUndefined();
    expect(compiled[0].handle).toBe(handlerMiddleware);

    expect(compiled[1].type).toBe(Elements.Middleware);
    expect(compiled[1].path).toBeUndefined();
    expect(compiled[1].method).toBeUndefined();
    expect(compiled[1].handle).toBe(handlerMiddleware);

    expect(compiled[1].routes![0].type).toBe(Elements.Route);
    expect(compiled[1].routes![0].path).toBe("/test");
    expect(compiled[1].routes![0].method).toBe("GET");
    expect(compiled[1].routes![0].handle).toBe(handlerRoute);

    expect(compiled[1].routes![1].type).toBe(Elements.Route);
    expect(compiled[1].routes![1].path).toBe("/test");
    expect(compiled[1].routes![1].method).toBe("POST");
    expect(compiled[1].routes![1].handle).toBe(handlerRoute);
  });

  test("Test route with two childs and one middleware to the routes", () => {
    const compiled = Renderer.compile(
      <Express>
        <Middleware path="/test1" handle={handlerMiddleware}>
          <Route path="/test2">
            <Route method="GET" handle={handlerRoute} />
            <Route method="POST" handle={handlerRoute} />
          </Route>
        </Middleware>
      </Express>
    ) as RouteNode[];

    expect(compiled[0].type).toBe(Elements.Middleware);
    expect(compiled[0].path).toBe("/test1");
    expect(compiled[0].handle).toBe(handlerMiddleware);

    expect(compiled[0].routes![0].type).toBe(Elements.Route);
    expect(compiled[0].routes![0].path).toBe("/test1/test2");
    expect(compiled[0].routes![0].method).toBe("GET");
    expect(compiled[0].routes![0].handle).toBe(handlerRoute);

    expect(compiled[0].routes![1].type).toBe(Elements.Route);
    expect(compiled[0].routes![1].path).toBe("/test1/test2");
    expect(compiled[0].routes![1].method).toBe("POST");
    expect(compiled[0].routes![1].handle).toBe(handlerRoute);
  });

  test("Test route with two childs and one middleware to the routes", () => {
    const compiled = Renderer.compile(
      <Express>
        <Route path="/test2">
          <Middleware path="/test1" handle={handlerMiddleware}>
            <Route method="GET" handle={handlerRoute} />
            <Route method="POST" handle={handlerRoute} />
          </Middleware>
        </Route>
      </Express>
    ) as RouteNode[];

    expect(compiled[0].type).toBe(Elements.Middleware);
    expect(compiled[0].path).toBe("/test2/test1");
    expect(compiled[0].handle).toBe(handlerMiddleware);

    expect(compiled[0].routes![0].type).toBe(Elements.Route);
    expect(compiled[0].routes![0].path).toBe("/test2/test1");
    expect(compiled[0].routes![0].method).toBe("GET");
    expect(compiled[0].routes![0].handle).toBe(handlerRoute);

    expect(compiled[0].routes![1].type).toBe(Elements.Route);
    expect(compiled[0].routes![1].path).toBe("/test2/test1");
    expect(compiled[0].routes![1].method).toBe("POST");
    expect(compiled[0].routes![1].handle).toBe(handlerRoute);
  });
});

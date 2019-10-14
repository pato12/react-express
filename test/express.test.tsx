import React from "react";

import {
  Renderer,
  Express,
  Middleware,
  Route,
  ErrorHandler
} from "@root/index";
import { RouteNode, Elements } from "@root/types";

const handlerMiddleware = Object.freeze(() => {});
const handlerRoute = Object.freeze(() => {});
const handlerError = Object.freeze(() => {});

describe("Test root path", () => {
  test("Test simple router with root path", () => {
    const compiled = Renderer.compile(
      <Express path="/app">
        <Route method="GET" path="/test" handle={handlerRoute} />
        <Route method="POST" path="/test" handle={handlerRoute} />
      </Express>
    );

    expect(compiled.type).toBe(Elements.Express);
    expect(compiled.path).toBe("/app");
    expect(compiled.method).toBeUndefined();
    expect(compiled.handle).toBeUndefined();

    expect(compiled.routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![0].path).toBe("/app/test");
    expect(compiled.routes![0].method).toBe("GET");
    expect(compiled.routes![0].handle).toBe(handlerRoute);

    expect(compiled.routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![1].path).toBe("/app/test");
    expect(compiled.routes![1].method).toBe("POST");
    expect(compiled.routes![1].handle).toBe(handlerRoute);
  });

  test("Test route with two childs with root path", () => {
    const compiled = Renderer.compile(
      <Express path="/app">
        <Route path="/test">
          <Route method="GET" handle={handlerRoute} />
          <Route method="POST" handle={handlerRoute} />
        </Route>
      </Express>
    );

    expect(compiled.type).toBe(Elements.Express);
    expect(compiled.path).toBe("/app");
    expect(compiled.method).toBeUndefined();
    expect(compiled.handle).toBeUndefined();

    expect(compiled.routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![0].path).toBe("/app/test");
    expect(compiled.routes![0].method).toBe("GET");
    expect(compiled.routes![0].handle).toBe(handlerRoute);

    expect(compiled.routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![1].path).toBe("/app/test");
    expect(compiled.routes![1].method).toBe("POST");
    expect(compiled.routes![1].handle).toBe(handlerRoute);
  });

  test("Test route with two childs with root path and two global middleware", () => {
    const compiled = Renderer.compile(
      <Express path="/app">
        <Middleware handle={handlerMiddleware} />
        <Middleware handle={handlerMiddleware} />

        <Route path="/test">
          <Route method="GET" handle={handlerRoute} />
          <Route method="POST" handle={handlerRoute} />
        </Route>
      </Express>
    );

    expect(compiled.type).toBe(Elements.Express);
    expect(compiled.path).toBe("/app");
    expect(compiled.method).toBeUndefined();
    expect(compiled.handle).toBeUndefined();

    expect(compiled.routes![0].type).toBe(Elements.Middleware);
    expect(compiled.routes![0].path).toBeUndefined();
    expect(compiled.routes![0].method).toBeUndefined();
    expect(compiled.routes![0].handle).toBe(handlerMiddleware);

    expect(compiled.routes![1].type).toBe(Elements.Middleware);
    expect(compiled.routes![1].path).toBeUndefined();
    expect(compiled.routes![1].method).toBeUndefined();
    expect(compiled.routes![1].handle).toBe(handlerMiddleware);

    expect(compiled.routes![2].type).toBe(Elements.Route);
    expect(compiled.routes![2].path).toBe("/app/test");
    expect(compiled.routes![2].method).toBe("GET");
    expect(compiled.routes![2].handle).toBe(handlerRoute);

    expect(compiled.routes![3].type).toBe(Elements.Route);
    expect(compiled.routes![3].path).toBe("/app/test");
    expect(compiled.routes![3].method).toBe("POST");
    expect(compiled.routes![3].handle).toBe(handlerRoute);
  });

  test("Test route with two childs with root path, one global middleware and one middleware to the routes", () => {
    const compiled = Renderer.compile(
      <Express path="/app">
        <Middleware handle={handlerMiddleware} />

        <Middleware handle={handlerMiddleware}>
          <Route path="/test">
            <Route method="GET" handle={handlerRoute} />
            <Route method="POST" handle={handlerRoute} />
          </Route>
        </Middleware>
      </Express>
    );

    expect(compiled.type).toBe(Elements.Express);
    expect(compiled.path).toBe("/app");
    expect(compiled.method).toBeUndefined();
    expect(compiled.handle).toBeUndefined();

    expect(compiled.routes![0].type).toBe(Elements.Middleware);
    expect(compiled.routes![0].path).toBeUndefined();
    expect(compiled.routes![0].method).toBeUndefined();
    expect(compiled.routes![0].handle).toBe(handlerMiddleware);

    expect(compiled.routes![1].type).toBe(Elements.Middleware);
    expect(compiled.routes![1].path).toBeUndefined();
    expect(compiled.routes![1].method).toBeUndefined();
    expect(compiled.routes![1].handle).toBe(handlerMiddleware);

    expect(compiled.routes![1].routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![1].routes![0].path).toBe("/app/test");
    expect(compiled.routes![1].routes![0].method).toBe("GET");
    expect(compiled.routes![1].routes![0].handle).toBe(handlerRoute);

    expect(compiled.routes![1].routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![1].routes![1].path).toBe("/app/test");
    expect(compiled.routes![1].routes![1].method).toBe("POST");
    expect(compiled.routes![1].routes![1].handle).toBe(handlerRoute);
  });

  test("Test simple router with root path and error handler", () => {
    const compiled = Renderer.compile(
      <Express path="/app">
        <Route method="GET" path="/test" handle={handlerRoute} />
        <Route method="POST" path="/test" handle={handlerRoute} />
        <ErrorHandler handle={handlerError} />
      </Express>
    );

    expect(compiled.type).toBe(Elements.Express);
    expect(compiled.path).toBe("/app");
    expect(compiled.method).toBeUndefined();
    expect(compiled.handle).toBeUndefined();

    expect(compiled.routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![0].path).toBe("/app/test");
    expect(compiled.routes![0].method).toBe("GET");
    expect(compiled.routes![0].handle).toBe(handlerRoute);

    expect(compiled.routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![1].path).toBe("/app/test");
    expect(compiled.routes![1].method).toBe("POST");
    expect(compiled.routes![1].handle).toBe(handlerRoute);

    expect(compiled.routes![2].type).toBe(Elements.ErrorHandler);
    expect(compiled.routes![2].path).toBeUndefined();
    expect(compiled.routes![2].method).toBeUndefined();
    expect(compiled.routes![2].handle).toBe(handlerError);
  });
});

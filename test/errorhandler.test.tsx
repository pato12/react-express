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

describe("Error Handler", () => {
  test("Test routes and errorhandler at bottom", () => {
    const compiled = Renderer.compile(
      <Express>
        <Route method="GET" path="/test" handle={handlerRoute} />
        <Route method="POST" path="/test" handle={handlerRoute} />
        <ErrorHandler handle={handlerError} />
      </Express>
    ) as RouteNode;

    expect(compiled.type).toBe(Elements.Express);
    expect(compiled.path).toBe("/");
    expect(compiled.method).toBeUndefined();
    expect(compiled.handle).toBeUndefined();

    expect(compiled.routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![0].path).toBe("/test");
    expect(compiled.routes![0].method).toBe("GET");
    expect(compiled.routes![0].handle).toBe(handlerRoute);

    expect(compiled.routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![1].path).toBe("/test");
    expect(compiled.routes![1].method).toBe("POST");
    expect(compiled.routes![1].handle).toBe(handlerRoute);

    expect(compiled.routes![2].type).toBe(Elements.ErrorHandler);
    expect(compiled.routes![2].path).toBeUndefined();
    expect(compiled.routes![2].method).toBeUndefined();
    expect(compiled.routes![2].handle).toBe(handlerError);
  });

  test("Test routes and errorhandler at top", () => {
    const compiled = Renderer.compile(
      <Express>
        <ErrorHandler handle={handlerError} />
        <Route method="GET" path="/test" handle={handlerRoute} />
        <Route method="POST" path="/test" handle={handlerRoute} />
      </Express>
    );

    expect(compiled.type).toBe(Elements.Express);
    expect(compiled.path).toBe("/");
    expect(compiled.method).toBeUndefined();
    expect(compiled.handle).toBeUndefined();

    expect(compiled.routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![0].path).toBe("/test");
    expect(compiled.routes![0].method).toBe("GET");
    expect(compiled.routes![0].handle).toBe(handlerRoute);

    expect(compiled.routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![1].path).toBe("/test");
    expect(compiled.routes![1].method).toBe("POST");
    expect(compiled.routes![1].handle).toBe(handlerRoute);

    expect(compiled.routes![2].type).toBe(Elements.ErrorHandler);
    expect(compiled.routes![2].path).toBeUndefined();
    expect(compiled.routes![2].method).toBeUndefined();
    expect(compiled.routes![2].handle).toBe(handlerError);
  });

  test("Test routes and twice errorhandler", () => {
    const compile = () =>
      Renderer.compile(
        <Express>
          <ErrorHandler handle={handlerError} />
          <ErrorHandler handle={handlerError} />
          <Route method="GET" path="/test" handle={handlerRoute} />
          <Route method="POST" path="/test" handle={handlerRoute} />
        </Express>
      );

    expect(compile).toThrowError();
  });

  test("Test error handler inside route", () => {
    const compile = () =>
      Renderer.compile(
        <Express>
          <Route path="/test">
            <Route method="GET" handle={handlerRoute} />
            <Route method="POST" handle={handlerRoute} />
            <ErrorHandler handle={handlerError} />
          </Route>
        </Express>
      );

    expect(compile).toThrowError();
  });

  test("Test error handler inside middleware", () => {
    const compile = () =>
      Renderer.compile(
        <Express>
          <Middleware path="/test" handle={handlerMiddleware}>
            <Route method="GET" handle={handlerRoute} />
            <Route method="POST" handle={handlerRoute} />
            <ErrorHandler handle={handlerError} />
          </Middleware>
        </Express>
      );

    expect(compile).toThrowError();
  });
});

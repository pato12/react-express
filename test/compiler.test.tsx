import React from "react";
import supertest from "supertest";
import * as express from "express";

import { Express, Middleware, Route, Methods, compile } from "@root/index";

describe("Routes", () => {
  test("Simple route", async () => {
    const app = compile(
      <Express>
        <Route method={Methods.GET} path="/test" handle={defaultHandler} />
      </Express>
    );

    const res = await supertest(app as express.Express).get("/test");

    expect(res.status).toBe(200);
    expect(res.text).toBe("ok");
  });

  test("Catch 404", async () => {
    const app = compile(
      <Express>
        <Route method={Methods.GET} path="/test" handle={defaultHandler} />
        <Middleware handle={handlerOf404} />
      </Express>
    );

    const res = await supertest(app as express.Express).get("/pagenotfound");

    expect(res.status).toBe(404);
    expect(res.text).toBe("404");
  });

  test("Nested routes", async () => {
    const app = compile(
      <Express>
        <Route method={Methods.GET} path="/test" handle={defaultHandler} />
        <Route path="/test2">
          <Route method={Methods.GET} path="/test3" handle={defaultHandler} />
          <Route path="/test4">
            <Route method={Methods.GET} path="/test5" handle={defaultHandler} />
          </Route>
        </Route>
        <Middleware handle={handlerOf404} />
      </Express>
    );

    let res = await supertest(app as express.Express).get("/test");

    expect(res.status).toBe(200);
    expect(res.text).toBe("ok");

    res = await supertest(app as express.Express).get("/test2/test3");

    expect(res.status).toBe(200);
    expect(res.text).toBe("ok");

    res = await supertest(app as express.Express).get("/test2/test4/test5");

    expect(res.status).toBe(200);
    expect(res.text).toBe("ok");
  });

  test("Nested routes with root path", async () => {
    const app = compile(
      <Express path="/app">
        <Route method={Methods.GET} path="/test" handle={defaultHandler} />
        <Route path="/test2">
          <Route method={Methods.GET} path="/test3" handle={defaultHandler} />
          <Route path="/test4">
            <Route method={Methods.GET} path="/test5" handle={defaultHandler} />
          </Route>
        </Route>
        <Middleware handle={handlerOf404} />
      </Express>
    );

    let res = await supertest(app as express.Express).get("/app/test");

    expect(res.status).toBe(200);
    expect(res.text).toBe("ok");

    res = await supertest(app as express.Express).get("/app/test2/test3");

    expect(res.status).toBe(200);
    expect(res.text).toBe("ok");

    res = await supertest(app as express.Express).get("/app/test2/test4/test5");

    expect(res.status).toBe(200);
    expect(res.text).toBe("ok");
  });
});

describe("Middlewares", () => {
  let defaultMiddlewareHandler;
  let mockFn;

  beforeAll(() => {
    ({
      mockFn,
      handler: defaultMiddlewareHandler
    } = generateMiddlewareHandlerWithMock("default"));
  });

  beforeEach(() => mockFn.mockReset());

  test("Simple middleware", async () => {
    const app = compile(
      <Express>
        <Middleware handle={defaultMiddlewareHandler} />
        <Route method={Methods.GET} path="/test" handle={defaultHandler} />
      </Express>
    );

    expect(mockFn).toBeCalledTimes(0);

    const res = await supertest(app as express.Express).get("/test");

    expect(res.status).toBe(200);
    expect(res.text).toBe("ok");
    expect(mockFn).toBeCalledTimes(1);
  });

  test("Simple middleware with child", async () => {
    const app = compile(
      <Express>
        <Middleware handle={defaultMiddlewareHandler}>
          <Route method={Methods.GET} path="/test" handle={defaultHandler} />
        </Middleware>
      </Express>
    );

    expect(mockFn).toBeCalledTimes(0);

    const res = await supertest(app as express.Express).get("/test");

    expect(res.status).toBe(200);
    expect(res.text).toBe("ok");
    expect(mockFn).toBeCalledTimes(1);
  });

  test("Simple middleware with childs and path", async () => {
    const app = compile(
      <Express>
        <Middleware path="/test1" handle={defaultMiddlewareHandler}>
          <Route method={Methods.GET} path="/test2" handle={defaultHandler} />
          <Route method={Methods.GET} path="/test3" handle={defaultHandler} />
        </Middleware>
      </Express>
    );

    expect(mockFn).toBeCalledTimes(0);

    let res = await supertest(app as express.Express).get("/test1/test2");

    expect(res.status).toBe(200);
    expect(res.text).toBe("ok");
    expect(mockFn).toBeCalledTimes(1);

    res = await supertest(app as express.Express).get("/test1/test3");

    expect(res.status).toBe(200);
    expect(res.text).toBe("ok");
    expect(mockFn).toBeCalledTimes(2);
  });

  test("Nested middleware with child", async () => {
    const {
      mockFn: mockFn1,
      handler: handler1
    } = generateMiddlewareHandlerWithMock("m1");
    const {
      mockFn: mockFn2,
      handler: handler2
    } = generateMiddlewareHandlerWithMock("m2");

    const app = compile(
      <Express>
        <Middleware handle={handler1}>
          <Middleware handle={handler2}>
            <Route method={Methods.GET} path="/test" handle={defaultHandler} />
          </Middleware>
        </Middleware>
        <Middleware handle={defaultMiddlewareHandler} />
      </Express>
    );

    expect(mockFn).toBeCalledTimes(0);
    expect(mockFn1).toBeCalledTimes(0);
    expect(mockFn2).toBeCalledTimes(0);

    const res = await supertest(app as express.Express).get("/test");

    expect(res.status).toBe(200);
    expect(res.text).toBe("ok");
    expect(mockFn1).toBeCalledTimes(1);
    expect(mockFn2).toBeCalledTimes(1);
    expect(mockFn).toBeCalledTimes(0);
  });

  test("Middleware to handle 404", async () => {
    const app = compile(
      <Express>
        <Route method={Methods.GET} path="/test" handle={defaultHandler} />
        <Middleware handle={handlerOf404} />
      </Express>
    );

    const res = await supertest(app as express.Express).get("/page404notfound");

    expect(res.status).toBe(404);
    expect(res.text).toBe("404");
  });
});

describe("Test all method", () => {
  const methods = Object.values(Methods);

  for (const method of methods) {
    test(`Test ${method} method`, async () => {
      const app = compile(
        <Express>
          <Route method={method} path="/test" handle={defaultHandler} />
          <Middleware handle={handlerOf404} />
        </Express>
      );

      const res = await supertest(app as express.Express)[method]("/test");

      expect(res.status).toBe(200);
    });
  }
});

const defaultHandler = (req, res: express.Response) =>
  res.status(200).send("ok");
const handlerOf404 = (req, res: express.Response) =>
  res.status(404).send("404");

const generateMiddlewareHandlerWithMock = name => {
  const mockFn = jest.fn().mockName(name);
  const handler = (req, res, next) => {
    mockFn();
    next();
  };
  return { mockFn, handler };
};

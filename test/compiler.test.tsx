import express from 'express';
import React from 'react';
import supertest from 'supertest';

import {
  compile,
  ErrorHandler,
  Express,
  Methods,
  Middleware,
  ParamMiddleware,
  Route,
} from '../src';
import * as compiler from '../src/renderer/compileExpressRoutes';
import { Elements } from '../src/types';

describe('Routes', () => {
  test('Simple route', async () => {
    const app = compile(
      <Express>
        <Route method={Methods.GET} path="/test" handle={defaultHandler} />
      </Express>
    );

    let resp = await supertest(app as express.Express).get('/test');

    expect(resp.status).toBe(200);
    expect(resp.text).toBe('ok');

    resp = await supertest(app as express.Express).get('/test/');

    expect(resp.status).toBe(200);
    expect(resp.text).toBe('ok');
  });

  test('Simples route with child', async () => {
    const app = compile(
      <Express>
        <Route>
          <Route>
            <Route method={Methods.GET} path="/test" handle={defaultHandler} />
          </Route>
        </Route>
      </Express>
    );

    const res = await supertest(app as express.Express).get('/test');

    expect(res.status).toBe(200);
    expect(res.text).toBe('ok');
  });

  test('Catch 404', async () => {
    const app = compile(
      <Express>
        <Route method={Methods.GET} path="/test" handle={defaultHandler} />
        <Middleware handle={handlerOf404} />
      </Express>
    );

    const res = await supertest(app as express.Express).get('/pagenotfound');

    expect(res.status).toBe(404);
    expect(res.text).toBe('404');
  });

  test('Nested routes', async () => {
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

    let res = await supertest(app as express.Express).get('/test');

    expect(res.status).toBe(200);
    expect(res.text).toBe('ok');

    res = await supertest(app as express.Express).get('/test2/test3');

    expect(res.status).toBe(200);
    expect(res.text).toBe('ok');

    res = await supertest(app as express.Express).get('/test2/test4/test5');

    expect(res.status).toBe(200);
    expect(res.text).toBe('ok');
  });

  test('Nested routes with root path', async () => {
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

    let res = await supertest(app as express.Express).get('/app/test');

    expect(res.status).toBe(200);
    expect(res.text).toBe('ok');

    res = await supertest(app as express.Express).get('/app/test2/test3');

    expect(res.status).toBe(200);
    expect(res.text).toBe('ok');

    res = await supertest(app as express.Express).get('/app/test2/test4/test5');

    expect(res.status).toBe(200);
    expect(res.text).toBe('ok');
  });

  test('Simple route with multiple handlers', async () => {
    const handlerPass = (req, res, next) => next();
    const app = compile(
      <Express>
        <Route
          method={Methods.GET}
          path="/test"
          handle={[handlerPass, handlerPass, defaultHandler]}
        />
      </Express>
    );

    const resp = await supertest(app as express.Express).get('/test');

    expect(resp.status).toBe(200);
    expect(resp.text).toBe('ok');
  });

  test('Test ALL method', async () => {
    const app = compile(
      <Express>
        <Route method={Methods.ALL} path="/test" handle={defaultHandler} />
      </Express>
    );

    let res = await supertest(app as express.Express).get('/test');

    expect(res.status).toBe(200);
    expect(res.text).toBe('ok');

    res = await supertest(app as express.Express).post('/test');

    expect(res.status).toBe(200);
    expect(res.text).toBe('ok');

    res = await supertest(app as express.Express).head('/test');

    expect(res.status).toBe(200);
  });

  test('Simple route stric mode', async () => {
    const app = compile(
      <Express>
        <Route strict={true}>
          <Route method={Methods.GET} path="/test" handle={defaultHandler} />
        </Route>
        <Middleware handle={handlerOf404} />
      </Express>
    );

    let resp = await supertest(app as express.Express).get('/test');

    expect(resp.status).toBe(200);
    expect(resp.text).toBe('ok');

    resp = await supertest(app as express.Express).get('/test/');

    expect(resp.status).toBe(404);
  });

  test('Simple route case sensitive mode', async () => {
    const app = compile(
      <Express>
        <Route caseSensitive={true}>
          <Route method={Methods.GET} path="/test" handle={defaultHandler} />
        </Route>
        <Middleware handle={handlerOf404} />
      </Express>
    );

    let resp = await supertest(app as express.Express).get('/test');

    expect(resp.status).toBe(200);
    expect(resp.text).toBe('ok');

    resp = await supertest(app as express.Express).get('/Test');

    expect(resp.status).toBe(404);
  });

  test('Simple route with merge params', async () => {
    const handlerId = (req, res) => res.send(req.params.id);
    const app = compile(
      <Express>
        <Route path="/:id" mergeParams={true}>
          <Route method={Methods.GET} path="/details" handle={handlerId} />
        </Route>
        <Middleware handle={handlerOf404} />
      </Express>
    );

    const resp = await supertest(app as express.Express).get('/10/details');

    expect(resp.status).toBe(200);
    expect(resp.text).toBe('10');
  });
});

describe('Middlewares', () => {
  let defaultMiddlewareHandler;
  let mockFn;

  beforeAll(() => {
    ({
      mockFn,
      handler: defaultMiddlewareHandler,
    } = generateMiddlewareHandlerWithMock('default'));
  });

  beforeEach(() => mockFn.mockReset());

  test('Simple middleware', async () => {
    const app = compile(
      <Express>
        <Middleware handle={defaultMiddlewareHandler} />
        <Route method={Methods.GET} path="/test" handle={defaultHandler} />
      </Express>
    );

    expect(mockFn).toBeCalledTimes(0);

    const res = await supertest(app as express.Express).get('/test');

    expect(res.status).toBe(200);
    expect(res.text).toBe('ok');
    expect(mockFn).toBeCalledTimes(1);
  });

  test('Simple middleware with path', async () => {
    const app = compile(
      <Express>
        <Middleware path="/test" handle={defaultMiddlewareHandler} />
        <Route method={Methods.GET} path="/test" handle={defaultHandler} />
      </Express>
    );

    expect(mockFn).toBeCalledTimes(0);

    const res = await supertest(app as express.Express).get('/test');

    expect(res.status).toBe(200);
    expect(res.text).toBe('ok');
    expect(mockFn).toBeCalledTimes(1);
  });

  test('Simple middleware with child', async () => {
    const app = compile(
      <Express>
        <Middleware handle={defaultMiddlewareHandler}>
          <Route method={Methods.GET} path="/test" handle={defaultHandler} />
        </Middleware>
      </Express>
    );

    expect(mockFn).toBeCalledTimes(0);

    const res = await supertest(app as express.Express).get('/test');

    expect(res.status).toBe(200);
    expect(res.text).toBe('ok');
    expect(mockFn).toBeCalledTimes(1);
  });

  test('Simple middleware with childs and path', async () => {
    const app = compile(
      <Express>
        <Middleware path="/test1" handle={defaultMiddlewareHandler}>
          <Route method={Methods.GET} path="/test2" handle={defaultHandler} />
          <Route method={Methods.GET} path="/test3" handle={defaultHandler} />
        </Middleware>
      </Express>
    );

    expect(mockFn).toBeCalledTimes(0);

    let res = await supertest(app as express.Express).get('/test1/test2');

    expect(res.status).toBe(200);
    expect(res.text).toBe('ok');
    expect(mockFn).toBeCalledTimes(1);

    res = await supertest(app as express.Express).get('/test1/test3');

    expect(res.status).toBe(200);
    expect(res.text).toBe('ok');
    expect(mockFn).toBeCalledTimes(2);
  });

  test('Nested middleware with child', async () => {
    const {
      mockFn: mockFn1,
      handler: handler1,
    } = generateMiddlewareHandlerWithMock('m1');
    const {
      mockFn: mockFn2,
      handler: handler2,
    } = generateMiddlewareHandlerWithMock('m2');

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

    const res = await supertest(app as express.Express).get('/test');

    expect(res.status).toBe(200);
    expect(res.text).toBe('ok');
    expect(mockFn1).toBeCalledTimes(1);
    expect(mockFn2).toBeCalledTimes(1);
    expect(mockFn).toBeCalledTimes(0);
  });

  test('Middleware to handle 404', async () => {
    const app = compile(
      <Express>
        <Route method={Methods.GET} path="/test" handle={defaultHandler} />
        <Middleware handle={handlerOf404} />
      </Express>
    );

    const res = await supertest(app as express.Express).get('/page404notfound');

    expect(res.status).toBe(404);
    expect(res.text).toBe('404');
  });

  test('Simple middleware with multiple handlers', async () => {
    const handlerPass = (req, res, next) => next();

    const app = compile(
      <Express>
        <Middleware handle={defaultMiddlewareHandler} />
        <Route
          method={Methods.GET}
          path="/test"
          handle={[handlerPass, handlerPass, defaultHandler]}
        />
      </Express>
    );

    expect(mockFn).toBeCalledTimes(0);

    const resp = await supertest(app as express.Express).get('/test');

    expect(resp.status).toBe(200);
    expect(resp.text).toBe('ok');
    expect(mockFn).toBeCalledTimes(1);
  });
});

describe('Test all method', () => {
  // ignore custom methods
  const customMethods = [Methods.ALL];
  const methods: string[] = Object.values(Methods as Record<
    string,
    string
  >).filter(m => !customMethods.includes(m));

  for (const method of methods) {
    test(`Test ${method} method`, async () => {
      const app = compile(
        <Express>
          <Route method={method} path="/test" handle={defaultHandler} />
          <Middleware handle={handlerOf404} />
        </Express>
      );

      const res = await supertest(app as express.Express)[method]('/test');

      expect(res.status).toBe(200);
    });
  }
});

describe('Test ErrorHandler', () => {
  test('Simple ErrorHandler', async () => {
    const mockFn = jest.fn();

    const error = new Error('fake error');
    const handlerThrowError = (req, res, next) => next(error);
    const errorHandler = (err, req, res, next) => {
      mockFn(err);
      res.status(500).send('error');
    };

    const app = compile(
      <Express>
        <Route method={Methods.GET} path="/test" handle={handlerThrowError} />
        <ErrorHandler handle={errorHandler} />
      </Express>
    );

    const resp = await supertest(app as express.Express).get('/test');

    expect(resp.status).toBe(500);
    expect(resp.text).toBe('error');
    expect(mockFn).toBeCalledTimes(1);
    expect(mockFn).toBeCalledWith(error);
  });
});

describe('Compiler', () => {
  test('Compile a Express element', () => {
    const compiled = compiler.compileRoute({
      type: Elements.Express,
      routes: [],
      path: '/',
    }) as express.Express;

    expect(compiled.listen).not.toBeUndefined();
    expect(compiled.init).not.toBeUndefined();
  });

  test('Compile a Route element', () => {
    const compiled = compiler.compileRoute({
      type: Elements.Route,
      routes: [],
      path: '/',
    }) as express.Router;

    expect(Object.getPrototypeOf(compiled) === express.Router).toBeTruthy();
  });

  test('Compile a Fake element', () => {
    const fakeCompiler = () =>
      compiler.compileRoute({
        type: 'Fake',
        routes: [],
        path: '/',
      });

    expect(fakeCompiler).toThrowError();
  });
});

const defaultHandler = (req, res: express.Response) =>
  res.status(200).send('ok');
const handlerOf404 = (req, res: express.Response) =>
  res.status(404).send('404');

const generateMiddlewareHandlerWithMock = name => {
  const mockFn = jest.fn().mockName(name);
  const handler = (req, res, next) => {
    mockFn();
    next();
  };
  return { mockFn, handler };
};

describe('ParamMiddleware', () => {
  const handleRoute = (req, res) => {
    res.status(200).send(req.params.id);
  };

  test('Simple ParamMiddleware', async () => {
    const mockFn = jest.fn();
    const handlerParamMiddleware = (req, res, next, id, name) => {
      req.product = { id };
      mockFn(name, id);
      next();
    };
    const app = compile(
      <Express>
        <ParamMiddleware name="id" handle={handlerParamMiddleware} />
        <Route method={Methods.GET} path="/product/:id" handle={handleRoute} />
      </Express>
    );

    const resp = await supertest(app as express.Express).get('/product/10');

    expect(mockFn).toBeCalledWith('id', '10');
    expect(resp.status).toBe(200);
    expect(resp.text).toBe('10');
  });

  describe('Customizing the behavior', () => {
    const handleValidator = (name, validator) => {
      return (req, res, next, val) => {
        if (validator(val)) {
          return next();
        }
        next(new Error('param not valid'));
      };
    };

    test('Pass the validation', async () => {
      const validateId = jest.fn(val => {
        return !isNaN(+val);
      });

      const app = compile(
        <Express>
          <ParamMiddleware handle={handleValidator} />
          <ParamMiddleware name="id" handle={validateId} />
          <Route
            method={Methods.GET}
            path="/product/:id"
            handle={handleRoute}
          />
        </Express>
      );

      const resp = await supertest(app as express.Express).get('/product/10');

      expect(resp.status).toBe(200);
      expect(resp.text).toBe('10');
      expect(validateId).toBeCalledTimes(1);
      expect(validateId).toBeCalledWith('10');
    });

    test('Fail the validation', async () => {
      const validateId = jest.fn(val => {
        return !isNaN(+val);
      });

      const app = compile(
        <Express>
          <ParamMiddleware handle={handleValidator} />
          <ParamMiddleware name="id" handle={validateId} />
          <Route
            method={Methods.GET}
            path="/product/:id"
            handle={handleRoute}
          />
        </Express>
      );

      const resp = await supertest(app as express.Express).get('/product/asd');

      expect(resp.status).toBe(500);
      expect(validateId).toBeCalledTimes(1);
      expect(validateId).toBeCalledWith('asd');
    });
  });
});

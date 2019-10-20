import React from 'react';

import {
  ErrorHandler,
  Express,
  Middleware,
  Renderer,
  Route,
} from '@root/index';
import { Elements } from '@root/types';
import { DEFAULT_PATH } from '@root/utils';

const handlerMiddleware = Object.freeze(() => {});
const handlerRoute = Object.freeze(() => {});
const handlerError = Object.freeze(() => {});

describe('Test root path', () => {
  test('Test simple router with root path', () => {
    const compiled = Renderer.generate(
      <Express path="/app">
        <Route method="GET" path="/test" handle={handlerRoute} />
        <Route method="POST" path="/test" handle={handlerRoute} />
      </Express>
    );

    expect(compiled.type).toBe(Elements.Express);
    expect(compiled.path).toBe('/app');
    expect(compiled.method).toBeUndefined();
    expect(compiled.handle).toBeUndefined();

    expect(compiled.routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![0].path).toBe('/test');
    expect(compiled.routes![0].method).toBe('GET');
    expect(compiled.routes![0].handle).toBe(handlerRoute);

    expect(compiled.routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![1].path).toBe('/test');
    expect(compiled.routes![1].method).toBe('POST');
    expect(compiled.routes![1].handle).toBe(handlerRoute);
  });

  test('Test route with two childs with root path', () => {
    const compiled = Renderer.generate(
      <Express path="/app">
        <Route path="/test">
          <Route method="GET" handle={handlerRoute} />
          <Route method="POST" handle={handlerRoute} />
        </Route>
      </Express>
    );

    expect(compiled.type).toBe(Elements.Express);
    expect(compiled.path).toBe('/app');
    expect(compiled.method).toBeUndefined();
    expect(compiled.handle).toBeUndefined();

    expect(compiled.routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![0].path).toBe('/test');
    expect(compiled.routes![0].method).toBeUndefined();

    expect(compiled.routes![0].routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![0].routes![0].path).toBe(DEFAULT_PATH);
    expect(compiled.routes![0].routes![0].method).toBe('GET');
    expect(compiled.routes![0].routes![0].handle).toBe(handlerRoute);

    expect(compiled.routes![0].routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![0].routes![1].path).toBe(DEFAULT_PATH);
    expect(compiled.routes![0].routes![1].method).toBe('POST');
    expect(compiled.routes![0].routes![1].handle).toBe(handlerRoute);
  });

  test('Test route with two childs with root path and two global middleware', () => {
    const compiled = Renderer.generate(
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
    expect(compiled.path).toBe('/app');
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
    expect(compiled.routes![2].method).toBeUndefined();
    expect(compiled.routes![2].handle).toBeUndefined();
    expect(compiled.routes![2].path).toBe('/test');

    expect(compiled.routes![2].routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![2].routes![0].method).toBe('GET');
    expect(compiled.routes![2].routes![0].path).toBe(DEFAULT_PATH);
    expect(compiled.routes![2].routes![0].handle).toBe(handlerRoute);

    expect(compiled.routes![2].routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![2].routes![1].method).toBe('POST');
    expect(compiled.routes![2].routes![1].path).toBe(DEFAULT_PATH);
    expect(compiled.routes![2].routes![1].handle).toBe(handlerRoute);
  });

  test('Test route with two childs with root path, one global middleware and one middleware to the routes', () => {
    const compiled = Renderer.generate(
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
    expect(compiled.path).toBe('/app');
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
    expect(compiled.routes![1].routes![0].path).toBe('/test');
    expect(compiled.routes![1].routes![0].handle).toBeUndefined();
    expect(compiled.routes![1].routes![0].method).toBeUndefined();

    expect(compiled.routes![1].routes![0].routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![1].routes![0].routes![0].path).toBe(DEFAULT_PATH);
    expect(compiled.routes![1].routes![0].routes![0].method).toBe('GET');
    expect(compiled.routes![1].routes![0].routes![0].handle).toBe(handlerRoute);

    expect(compiled.routes![1].routes![0].routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![1].routes![0].routes![1].path).toBe(DEFAULT_PATH);
    expect(compiled.routes![1].routes![0].routes![1].method).toBe('POST');
    expect(compiled.routes![1].routes![0].routes![1].handle).toBe(handlerRoute);
  });

  test('Test simple router with root path and error handler', () => {
    const compiled = Renderer.generate(
      <Express path="/app">
        <Route method="GET" path="/test" handle={handlerRoute} />
        <Route method="POST" path="/test" handle={handlerRoute} />
        <ErrorHandler handle={handlerError} />
      </Express>
    );

    expect(compiled.type).toBe(Elements.Express);
    expect(compiled.path).toBe('/app');
    expect(compiled.method).toBeUndefined();
    expect(compiled.handle).toBeUndefined();

    expect(compiled.routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![0].path).toBe('/test');
    expect(compiled.routes![0].method).toBe('GET');
    expect(compiled.routes![0].handle).toBe(handlerRoute);

    expect(compiled.routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![1].path).toBe('/test');
    expect(compiled.routes![1].method).toBe('POST');
    expect(compiled.routes![1].handle).toBe(handlerRoute);

    expect(compiled.routes![2].type).toBe(Elements.ErrorHandler);
    expect(compiled.routes![2].path).toBeUndefined();
    expect(compiled.routes![2].method).toBeUndefined();
    expect(compiled.routes![2].handle).toBe(handlerError);
  });
});

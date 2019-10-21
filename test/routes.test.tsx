import React from 'react';

import { Express, Renderer, Route } from '../src/index';
import { Elements } from '../src/types';
import { DEFAULT_PATH } from '../src/utils';

const handlerRoute = Object.freeze(() => {});

describe('Test routes', () => {
  test('Test simple router', () => {
    const compiled = Renderer.generate(
      <Express>
        <Route method="GET" path="/test" handle={handlerRoute} />
        <Route method="POST" path="/test" handle={handlerRoute} />
      </Express>
    );

    expect(compiled.routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![0].path).toBe('/test');
    expect(compiled.routes![0].method).toBe('GET');
    expect(compiled.routes![0].handle).toBe(handlerRoute);

    expect(compiled.routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![1].path).toBe('/test');
    expect(compiled.routes![1].method).toBe('POST');
    expect(compiled.routes![1].handle).toBe(handlerRoute);
  });

  test('Test route with two childs', () => {
    const compiled = Renderer.generate(
      <Express>
        <Route path="/test">
          <Route method="GET" handle={handlerRoute} />
          <Route method="POST" handle={handlerRoute} />
        </Route>
      </Express>
    );

    expect(compiled.routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![0].path).toBe('/test');
    expect(compiled.routes![0].method).toBeUndefined();
    expect(compiled.routes![0].handle).toBeUndefined();

    expect(compiled.routes![0].routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![0].routes![0].path).toBe(DEFAULT_PATH);
    expect(compiled.routes![0].routes![0].method).toBe('GET');
    expect(compiled.routes![0].routes![0].handle).toBe(handlerRoute);

    expect(compiled.routes![0].routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![0].routes![1].path).toBe(DEFAULT_PATH);
    expect(compiled.routes![0].routes![1].method).toBe('POST');
    expect(compiled.routes![0].routes![1].handle).toBe(handlerRoute);
  });

  test('Test nested routes', () => {
    const compiled = Renderer.generate(
      <Express>
        <Route path="/test">
          <Route method="GET" handle={handlerRoute} />
          <Route method="POST" handle={handlerRoute} />

          <Route method="GET" path="/test2" handle={handlerRoute} />
          <Route method="GET" path="/test3" handle={handlerRoute} />

          <Route path="/test5">
            <Route method="GET" path="/test6" handle={handlerRoute} />
            <Route method="GET" path="/test7" handle={handlerRoute} />
            <Route method="GET" handle={handlerRoute} />

            <Route path="/test8">
              <Route method="GET" path="/test9" handle={handlerRoute} />
              <Route method="POST" path="/test9" handle={handlerRoute} />
              <Route method="GET" handle={handlerRoute} />
            </Route>
          </Route>
        </Route>
      </Express>
    );

    expect(compiled.routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![0].path).toBe('/test');
    expect(compiled.routes![0].method).toBeUndefined();
    expect(compiled.routes![0].handle).toBeUndefined();

    expect(compiled.routes![0].routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![0].routes![0].path).toBe(DEFAULT_PATH);
    expect(compiled.routes![0].routes![0].method).toBe('GET');
    expect(compiled.routes![0].routes![0].handle).toBe(handlerRoute);

    expect(compiled.routes![0].routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![0].routes![1].path).toBe(DEFAULT_PATH);
    expect(compiled.routes![0].routes![1].method).toBe('POST');
    expect(compiled.routes![0].routes![1].handle).toBe(handlerRoute);

    expect(compiled.routes![0].routes![2].type).toBe(Elements.Route);
    expect(compiled.routes![0].routes![2].path).toBe('/test2');
    expect(compiled.routes![0].routes![2].method).toBe('GET');
    expect(compiled.routes![0].routes![2].handle).toBe(handlerRoute);

    expect(compiled.routes![0].routes![3].type).toBe(Elements.Route);
    expect(compiled.routes![0].routes![3].path).toBe('/test3');
    expect(compiled.routes![0].routes![3].method).toBe('GET');
    expect(compiled.routes![0].routes![3].handle).toBe(handlerRoute);

    expect(compiled.routes![0].routes![4].type).toBe(Elements.Route);
    expect(compiled.routes![0].routes![4].path).toBe('/test5');
    expect(compiled.routes![0].routes![4].method).toBeUndefined();
    expect(compiled.routes![0].routes![4].handle).toBeUndefined();

    expect(compiled.routes![0].routes![4].routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![0].routes![4].routes![0].path).toBe('/test6');
    expect(compiled.routes![0].routes![4].routes![0].method).toBe('GET');
    expect(compiled.routes![0].routes![4].routes![0].handle).toBe(handlerRoute);

    expect(compiled.routes![0].routes![4].routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![0].routes![4].routes![1].path).toBe('/test7');
    expect(compiled.routes![0].routes![4].routes![1].method).toBe('GET');
    expect(compiled.routes![0].routes![4].routes![1].handle).toBe(handlerRoute);

    expect(compiled.routes![0].routes![4].routes![2].type).toBe(Elements.Route);
    expect(compiled.routes![0].routes![4].routes![2].path).toBe(DEFAULT_PATH);
    expect(compiled.routes![0].routes![4].routes![2].method).toBe('GET');
    expect(compiled.routes![0].routes![4].routes![2].handle).toBe(handlerRoute);

    expect(compiled.routes![0].routes![4].routes![3].type).toBe(Elements.Route);
    expect(compiled.routes![0].routes![4].routes![3].path).toBe('/test8');
    expect(compiled.routes![0].routes![4].routes![3].method).toBeUndefined();
    expect(compiled.routes![0].routes![4].routes![3].handle).toBeUndefined();

    expect(compiled.routes![0].routes![4].routes![3].routes![0].type).toBe(
      Elements.Route
    );
    expect(compiled.routes![0].routes![4].routes![3].routes![0].path).toBe(
      '/test9'
    );
    expect(compiled.routes![0].routes![4].routes![3].routes![0].method).toBe(
      'GET'
    );
    expect(compiled.routes![0].routes![4].routes![3].routes![0].handle).toBe(
      handlerRoute
    );

    expect(compiled.routes![0].routes![4].routes![3].routes![1].type).toBe(
      Elements.Route
    );
    expect(compiled.routes![0].routes![4].routes![3].routes![1].path).toBe(
      '/test9'
    );
    expect(compiled.routes![0].routes![4].routes![3].routes![1].method).toBe(
      'POST'
    );
    expect(compiled.routes![0].routes![4].routes![3].routes![1].handle).toBe(
      handlerRoute
    );

    expect(compiled.routes![0].routes![4].routes![3].routes![2].type).toBe(
      Elements.Route
    );
    expect(compiled.routes![0].routes![4].routes![3].routes![2].path).toBe(
      DEFAULT_PATH
    );
    expect(compiled.routes![0].routes![4].routes![3].routes![2].method).toBe(
      'GET'
    );
    expect(compiled.routes![0].routes![4].routes![3].routes![2].handle).toBe(
      handlerRoute
    );
  });
});

describe('Extra test routes', () => {
  test('Using custom component', () => {
    const CustomComponent = () => (
      <Route path="/pato">
        <Route method="GET" handle={handlerRoute} />
        <Route method="POST" handle={handlerRoute} />
      </Route>
    );
    const compiled = Renderer.generate(
      <Express>
        <Route method="GET" path="/test" handle={handlerRoute} />
        <Route method="POST" path="/test" handle={handlerRoute} />
        <CustomComponent />
      </Express>
    );

    expect(compiled.routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![0].path).toBe('/test');
    expect(compiled.routes![0].method).toBe('GET');
    expect(compiled.routes![0].handle).toBe(handlerRoute);

    expect(compiled.routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![1].path).toBe('/test');
    expect(compiled.routes![1].method).toBe('POST');
    expect(compiled.routes![1].handle).toBe(handlerRoute);

    expect(compiled.routes![2].type).toBe(Elements.Route);
    expect(compiled.routes![2].path).toBe('/pato');
    expect(compiled.routes![2].method).toBeUndefined();
    expect(compiled.routes![2].handle).toBeUndefined();

    expect(compiled.routes![2].routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![2].routes![0].path).toBe(DEFAULT_PATH);
    expect(compiled.routes![2].routes![0].method).toBe('GET');
    expect(compiled.routes![2].routes![0].handle).toBe(handlerRoute);

    expect(compiled.routes![2].routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![2].routes![1].path).toBe(DEFAULT_PATH);
    expect(compiled.routes![2].routes![1].method).toBe('POST');
    expect(compiled.routes![2].routes![1].handle).toBe(handlerRoute);
  });
  test('Using react fragment', () => {
    const compiled = Renderer.generate(
      <Express>
        <Route method="GET" path="/test" handle={handlerRoute} />
        <Route method="POST" path="/test" handle={handlerRoute} />
        <React.Fragment>
          <Route path="/pato">
            <Route method="GET" handle={handlerRoute} />
            <Route method="POST" handle={handlerRoute} />
          </Route>
        </React.Fragment>
      </Express>
    );

    expect(compiled.routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![0].path).toBe('/test');
    expect(compiled.routes![0].method).toBe('GET');
    expect(compiled.routes![0].handle).toBe(handlerRoute);

    expect(compiled.routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![1].path).toBe('/test');
    expect(compiled.routes![1].method).toBe('POST');
    expect(compiled.routes![1].handle).toBe(handlerRoute);

    expect(compiled.routes![2].type).toBe(Elements.Route);
    expect(compiled.routes![2].path).toBe('/pato');
    expect(compiled.routes![2].method).toBeUndefined();
    expect(compiled.routes![2].handle).toBeUndefined();

    expect(compiled.routes![2].routes![0].type).toBe(Elements.Route);
    expect(compiled.routes![2].routes![0].path).toBe(DEFAULT_PATH);
    expect(compiled.routes![2].routes![0].method).toBe('GET');
    expect(compiled.routes![2].routes![0].handle).toBe(handlerRoute);

    expect(compiled.routes![2].routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![2].routes![1].path).toBe(DEFAULT_PATH);
    expect(compiled.routes![2].routes![1].method).toBe('POST');
    expect(compiled.routes![2].routes![1].handle).toBe(handlerRoute);
  });
});

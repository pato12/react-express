import React from 'react';

import { Express, ParamMiddleware, Renderer, Route } from '../src/index';
import { Elements } from '../src/types';

const handlerMiddleware = Object.freeze(() => {});
const handlerRoute = Object.freeze(() => {});

describe('Test parammiddleware', () => {
  test('Test simple parammiddleware', () => {
    const compiled = Renderer.generate(
      <Express>
        <ParamMiddleware name="id" handle={handlerMiddleware} />
        <Route path="/product/:id" method="GET" handle={handlerRoute} />
      </Express>
    );

    expect(compiled.routes![0].type).toBe(Elements.ParamMiddleware);
    expect(compiled.routes![0].handle).toBe(handlerMiddleware);

    expect(compiled.routes![1].type).toBe(Elements.Route);
    expect(compiled.routes![1].handle).toBe(handlerRoute);
  });

  test('Customizing the behavior', () => {
    const compiled = Renderer.generate(
      <Express>
        <ParamMiddleware handle={handlerMiddleware} />
        <ParamMiddleware name="id" handle={handlerMiddleware} />
        <Route path="/product/:id" method="GET" handle={handlerRoute} />
      </Express>
    );

    expect(compiled.routes![0].type).toBe(Elements.ParamMiddleware);
    expect(compiled.routes![0].handle).toBe(handlerMiddleware);

    expect(compiled.routes![1].type).toBe(Elements.ParamMiddleware);
    expect(compiled.routes![1].handle).toBe(handlerMiddleware);

    expect(compiled.routes![2].type).toBe(Elements.Route);
    expect(compiled.routes![2].handle).toBe(handlerRoute);
  });
});

import { Renderer, Express, Middleware, Route, ErrorHandler } from "../src";
import React from "react";

const handleTest = () => {};
const handlePostProduct = () => {};
const handleGetProducts = () => {};
const handleGetProduct = () => {};
const handleMiddleware = () => {};
const handleErrorHandler = () => {};

const CustomRouter = () => (
  <Middleware handle={handleTest}>
    <Middleware handle={handleTest}>
      <Route path="/pepe">
        <Middleware handle={handleTest} />
        <Middleware handle={handleTest} />

        <Route path="/asd" method="GET" handle={handleTest} />

        <Route path="/asd2">
          <Route path="/asd" method="GET" handle={handleTest} />
        </Route>
        <Route method="GET" handle={handleTest} />
      </Route>
    </Middleware>
  </Middleware>
);

Renderer.compile(
  <Express path="/app">
    <Middleware handle={handleMiddleware} />
    <Middleware handle={handleMiddleware} />
    <Middleware handle={handleMiddleware} />

    <Route method="GET" path="/test" handle={handleTest} />

    <Route path="/products">
      <Middleware path="/:id" handle={handleMiddleware} />
      <Route path="/:id" method="GET" handle={handleGetProduct} />
      <Route path="/:id" method="POST" handle={handlePostProduct} />
      <Route method="GET" handle={handleGetProducts} />
    </Route>

    <Middleware handle={handleMiddleware}>
      <Route method="GET" path="/test2" handle={handleTest} />
    </Middleware>

    <CustomRouter />

    <ErrorHandler handle={handleErrorHandler} />
  </Express>
);

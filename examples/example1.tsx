import { Renderer, Express, Middleware, Route, ErrorHandler } from "../src";
import React from "react";
import express from "express";

const defaultHandler = (req: express.Request, res: express.Response) => {
  console.log(`[default] pass: ${req.path}`);
  res.send(`OK: ${req.path}`);
};

const handleErrorHandler = (
  err,
  req: express.Request,
  res: express.Response,
  next
) => {
  console.log(`[error] pass: ${req.path}`);
  res.send(`Error handler: ${req.path}`);
};

const getMiddleware = name => (
  req: express.Request,
  res: express.Response,
  next
) => {
  console.log(`[${name}] pass: ${req.path}`);
  next();
};

const handleTest = defaultHandler;
const handlePostProduct = defaultHandler;
const handleGetProducts = defaultHandler;
const handleGetProduct = defaultHandler;

// const CustomRouter = () => (
//   <Middleware handle={handleTest}>
//     <Middleware handle={handleTest}>
//       <Route path="/pepe">
//         <Middleware handle={handleTest} />
//         <Middleware handle={handleTest} />

//         <Route path="/asd" method="GET" handle={handleTest} />

//         <Route path="/asd2">
//           <Route path="/asd" method="GET" handle={handleTest} />
//         </Route>
//         <Route method="GET" handle={handleTest} />
//       </Route>
//     </Middleware>
//   </Middleware>
// );

const routes = Renderer.compile(
  <Express>
    <Middleware handle={getMiddleware("1")} />

    <Route method="GET" path="/test" handle={handleTest} />

    <Route path="/products">
      <Middleware path="/:id" handle={getMiddleware("2")} />
      <Route path="/:id" method="GET" handle={handleGetProduct} />
      <Route path="/:id" method="POST" handle={handlePostProduct} />
      <Route method="GET" handle={handleGetProducts} />
    </Route>

    <Middleware path="/test2" handle={getMiddleware("3")}>
      <Route method="GET" handle={handleTest} />
    </Middleware>

    <ErrorHandler handle={handleErrorHandler} />
  </Express>
);

const app = Renderer.generate(routes) as express.Express;

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

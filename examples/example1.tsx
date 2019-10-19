import { Renderer, Express, Middleware, Route, ErrorHandler } from "../src";
import React from "react";
import express from "express";

const defaultHandler = (req: express.Request, res: express.Response) => {
  res.send(`OK: ${req.path}`);
};

const defaultMiddleware = (
  req: express.Request,
  res: express.Response,
  next
) => {
  console.log(`OK: ${req.path}`);
  next();
};

const handleTest = defaultHandler;
const handlePostProduct = defaultHandler;
const handleGetProducts = defaultHandler;
const handleGetProduct = defaultHandler;
const handleMiddleware = defaultMiddleware;
const handleErrorHandler = defaultHandler;

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
  <Express path="/app">
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

    <React.Fragment>
      <ErrorHandler handle={handleErrorHandler} />
    </React.Fragment>
  </Express>
);

console.log(JSON.stringify(routes, null, 4));

// const app = Renderer.generate(routes);

// app.listen(3000, function() {
//   console.log("Example app listening on port 3000!");
// });

# react-express-router

<p align="center">
  <img src="https://img.shields.io/github/license/pato12/react-express">
  <img src="https://img.shields.io/npm/dt/react-express-router">
  <img src="https://img.shields.io/npm/v/react-express-router">
  <img src="https://img.shields.io/github/stars/pato12/react-express?style=social">
</p>

React Express Router is a wrapper of the Express APIs to use they like a react components.

## How to install

```
yarn add react-express-router react
```

or

```
npm i react-express-router react
```

# Usage

```jsx
import React from 'react';
import { Express, Route, compile } from 'react-express-router';

const handlerHelloWorld = (req, res) => {
  res.send('Hello world!');
};

const app = compile(
  <Express>
    <Route path="/test" method="GET" handle={handlerHelloWorld} />
  </Express>
);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
```

and visit http://localhost:3000/test to look the hello world!

# Documentation

### Components

- Express
- Middleware
- Route
- ErrorHandler
- ParamMiddleware

### Express

This components is used to wrap all routes/middlewares. And when it's compiled returns an Application instance.

Example:

```jsx
const app = compile(
  <Express>
    <Route path="/test" method="GET" handle={handlerHelloWorld} />
  </Express>
);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
```

### Middleware

With this component you can define a middleware. Also you can wrap routes/middlewares with it.

Example:

```jsx
const app = compile(
  <Express>
    <Middleware handle={bodyParser.json()} />
    <Route path="/user" method="POST" handle={handlerUserCreation} />
    <Route path="/" method="GET" handle={handlerDefaultPage} />
  </Express>
);
```

```jsx
const app = compile(
  <Express>
    <Middleware handle={authMiddleware}>
      <Route path="/dashboard" method="GET" handle={handlerDashboard} />
      <Route path="/profile" method="GET" handle={handlerProfile} />
    </Middleware>
    <Route path="/" method="GET" handle={handlerDefaultPage} />
  </Express>
);
```

```jsx
const app = compile(
  <Express>
    <Middleware path="/account" handle={authMiddleware}>
      <Route path="/apps" method="GET" handle={handlerApps} />{' '}
      {/* you can access using /account/apps */}
      <Route path="/profile" method="GET" handle={handlerProfile} /> {/* you can access using /account/profile */}
    </Middleware>
    <Route path="/" method="GET" handle={handlerDefaultPage} />
  </Express>
);
```

### Route

```jsx
const app = compile(
  <Express>
    <Route path="/" method="GET" handle={handlerDefaultPage} />
    <Route path="/about" method="GET" handle={handlerAboutPage} />
    <Route path="/products">
      <Route path="/:id" method="GET" handler={handlerGetProduct} />
      <Route path="/:id" method="POST" handler={handlerCreateProduct} />
      <Route path="/:id" method="PUT" handler={handlerUpdateProduct} />
      <Route path="/" method="GET" handler={handlerGetAllProducts} />
    </Route>
  </Express>
);
```

```jsx
// also you can nested more routes
const app = compile(
  <Express>
    <Route path="/" method="GET" handle={handlerDefaultPage} />
    <Route path="/about" method="GET" handle={handlerAboutPage} />
    <Route path="/products">
      <Route path="/:id" method="GET" handler={handlerGetProduct} />
      <Route path="/:id" method="POST" handler={handlerCreateProduct} />
      <Route path="/:id" method="PUT" handler={handlerUpdateProduct} />
      <Route path="/" method="GET" handler={handlerGetAllProducts} />

      <Route path="/details">
        <Route path="/" method="GET" handler={handlerGetProductDetails} />
        <Route path="/shippings">
          <Route path="/" method="GET" handler={handleGetProductShippings} />
          <Route path="/:id" method="GET" handler={handleGetProductShipping} />
        </Route>
      </Route>
    </Route>
  </Express>
);
```

### ErrorHandler

```jsx
// the handlerError is a function that need to have a signature: (err, req, res, next)
// more info in https://expressjs.com/en/guide/error-handling.html
const app = compile(
  <Express>
    <Route path="/" method="GET" handle={handlerDefaultPage} />
    <ErrorHandler handle={handlerError} />
  </Express>
);
```

### ParamMiddleware

TODO

### Custom Components

TODO

### Compile a Route

TODO

## Next steps

- Improve the documentation
- Refactor props handler
- Implement options to the Route when it wrap others
- Implement a component to use `express.static`, `express.json` and `express.urlencoded`

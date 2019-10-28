# react-express-router

<p align="center">
  <img src="https://img.shields.io/github/license/pato12/react-express">
  <img src="https://img.shields.io/npm/dt/react-express-router">
  <img src="https://img.shields.io/npm/v/react-express-router">
  <img src="https://img.shields.io/github/stars/pato12/react-express?style=social">
</p>

React Express Router is a declarative router that wrap Express APIs to use they like a react components.

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

const app = (
  <Express>
    <Route path="/test" method="GET" handle={handlerHelloWorld} />
  </Express>
);

compile(app).listen(3000, () => {
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

| Prop | Description | Value                                         | Default   |
| ---- | ----------- | --------------------------------------------- | --------- |
| path | Root path.  | `string \| RegExp \| Array<string \| RegExp>` | undefined |

Example:

```jsx
const app = (
  <Express>
    <Route path="/test" method="GET" handle={handlerHelloWorld} />
  </Express>
);

compile(app).listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
```

### Middleware

With this component you can define a middleware. Also you can wrap routes/middlewares with it.

| Prop   | Description                                        | Value                                         | Default   |
| ------ | -------------------------------------------------- | --------------------------------------------- | --------- |
| path   | Access path.                                       | `string \| RegExp \| Array<string \| RegExp>` | undefined |
| handle | Action to execute when the middleware is triggered | `function(req, res, next)`                    | -         |

More info: http://expressjs.com/en/guide/writing-middleware.html#writing-middleware-for-use-in-express-apps

Example:

```jsx
const app = (
  <Express>
    <Middleware handle={bodyParser.json()} />
    <Route path="/user" method="POST" handle={handlerUserCreation} />
    <Route path="/" method="GET" handle={handlerDefaultPage} />
  </Express>
);
```

```jsx
const app = (
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
const app = (
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

Probably the most important component. It has the responsibility to catch the current request.

| Prop          | Description                                            | Value                                         | Default   |
| ------------- | ------------------------------------------------------ | --------------------------------------------- | --------- |
| path          | Access path.                                           | `string \| RegExp \| Array<string \| RegExp>` | undefined |
| method        | The http method. See the full list below.              | `get \| post \| put`                          | -         |
| handle        | Action to execute when the route is triggered          | `function(req, res, next)`                    | -         |
| caseSensitive | Enable case sensitivity.                               | `boolean`                                     | false     |
| mergeParams   | Preserve the req.params values from the parent router. | `boolean`                                     | false     |
| strict        | Enable strict routing.                                 | `boolean`                                     | false     |

Full list of methods: http://expressjs.com/en/4x/api.html#app.METHOD
More info: http://expressjs.com/en/guide/routing.html

Examples:

```jsx
const app = (
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
const app = (
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

Component to catch and process an error with the request. Only one per app.

| Prop   | Description                                           | Value                           | Default |
| ------ | ----------------------------------------------------- | ------------------------------- | ------- |
| handle | Action to execute when the error handler is triggered | `function(err, req, res, next)` | -       |

More info: http://expressjs.com/en/guide/error-handling.html#error-handling

```jsx
const app = (
  <Express>
    <Route path="/" method="GET" handle={handlerDefaultPage} />
    <ErrorHandler handle={handlerError} />
  </Express>
);
```

### ParamMiddleware

This middleware is used to handler custom params.

| Prop   | Description                                           | Value                                 | Default   |
| ------ | ----------------------------------------------------- | ------------------------------------- | --------- |
| name   | Name of the param (optional)                          | `string`                              | undefined |
| handle | Action to execute when the error handler is triggered | `function(req, res, next, val, name)` | -         |

More info: http://expressjs.com/en/api.html#app.param

### Custom Components

Also you can create your own components with the native components.

Example:

```jsx
const UserRouter = () => (
  <Middleware path="/user" handle={handlerUserAuth}>
    <Route path="/" method="GET" handle={handlerUserPage} />
    <Route path="/settings" method="GET" handle={handlerUserSettings} />
  </Middleware>
);

const app = (
  <Express>
    <Route path="/" method="GET" handle={handlerDefaultPage} />
    <UserRouter />
    <ErrorHandler handle={handlerError} />
  </Express>
);
```

### Compile a Route

And you can compile a router and integrate it with your current app.

```jsx
const UserRouter = () => (
  <Route>
    <Middleware path="/user" handle={handlerUserAuth}>
      <Route path="/" method="GET" handle={handlerUserPage} />
      <Route path="/settings" method="GET" handle={handlerUserSettings} />
    </Middleware>
  </Route>
);

const app = express();

app.use(pageRouter);
app.use(compile(<UserRouter />));
```

## Next steps

- Improve the documentation
- Implement a component to use `express.static`, `express.json` and `express.urlencoded`

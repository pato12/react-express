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

TODO

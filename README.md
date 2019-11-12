# use-root-reducer

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/use-root-reducer.svg?style=flat-square
[npm-url]: https://npmjs.org/package/use-root-reducer
[travis-image]: https://img.shields.io/travis/ahungrynoob/use-root-reducer.svg?style=flat-square
[travis-url]: https://travis-ci.org/ahungrynoob/use-root-reducer
[codecov-image]: https://codecov.io/gh/ahungrynoob/use-root-reducer/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/ahungrynoob/use-root-reducer
[download-image]: https://img.shields.io/npm/dm/use-root-reducer.svg?style=flat-square
[download-url]: https://npmjs.org/package/use-root-reducer

A helper to create and maintain a root state without redux. (based on react hooks)
<br/>
**The implementation is quit simple:**

1. Childcomponents access root state and root dispatch function throught [React Context API](https://reactjs.org/docs/context.html) and [useContext hook](https://reactjs.org/docs/hooks-reference.html#usecontext)
2. When call the root dispatch, it will traverse your dispatches and pass action argv which are outputed by [useReducer hook](https://reactjs.org/docs/hooks-reference.html#usereducer).
3. **The root dispatch function outputed by `use-root-reducer` is immutable in per functional component.**

---

## Install

```bash
$ npm i use-root-reducer --save
```

## Usage

**First of all, create a root state and a root dispatch provider as `RootReducerProvider` in a independent file which can improve performance.[Avoiding unnecessary renders with React context](https://frontarm.com/james-k-nelson/react-context-performance/)**

```jsx
// context.jsx
import React, { Dispatch, useReducer } from "react";
import useRootReducer from "use-root-reducer";
import { RootAction } from "../redux/action";
import { fooReducer,barReducer } from "../redux/reducer";

export const StateContext = React.createContext({});

export const DispatchContext = React.createContext(null);

export const RootReducerProvider = ({ children, foo, bar }) => {
  const [state, dispatch] = useRootReducer({
    foo: useReducer(fooReducer, "foo")
    bar: useReducer(barReducer, "bar")
  });
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
```

**Second, import the root `RootReducerProvider` to your root component such as app.jsx**

```jsx
// app.jsx
import React from "react";
import { BrowserRouter, StaticRouter, Switch, Route } from "react-router-dom";
import NotFound from "./notfound";
import Content from "./content";
import Home from "./home";
import { RootReducerProvider } from "./context";

const Router = __CLIENT__ ? BrowserRouter : StaticRouter;

const App = props => {
  const { location: staticLocation, context, bgIndex, foo, bar } = props;
  return (
    <Router location={staticLocation} context={context}>
      <RootReducerProvider foo={foo} bar={bar}>
        <div>children component</div>
      </RootReducerProvider>
    </Router>
  );
};

export default App;
```

**In the end, in your child components you can access your root state and root dispatch with `useContext`:**

```jsx
//
import React from "react";

import { StateContext, DispatchContext } from "./context.js";

export default () => {
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  const { foo, bar } = state;

  return (
    <button
      onClick={() => {
        // dispatch your action and will be received in all your reducers
        dispatch({ type: "update", payload: "foo updated", meta: "foo" });
      }}
    >{`${foo} and ${bar}`}</button>
  );
};
```

## License

[MIT](LICENSE)

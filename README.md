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

A helper to create and maintain a global state without redux. (based on react hooks)

---

## Install

```bash
$ npm i use-root-reducer --save
```

## Usage

**First of all, create a global state and a global dispatch function in your root component:**

```jsx
// app.jsx
import React, { useReducer } from "react";
import useRootReducer from "use-root-reducer";
import { fooReducer, barReducer } from "./reducer";
import { StateContext, DispatchContext } from "./context";

const App = ({ children }) => {
  const [state, dispatch] = useRootReducer({
    foo: useReducer(fooReducer, "foo"),
    bar: useReducer(barReducer, "bar")
  });
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default App;
```

You can pass your global state and global dispatch method (it will have `foo` and `bar` key-value in the above example) to your children components via props or with [React Context API](https://reactjs.org/docs/context.html "React Context").

**Second, it's recommended to maintain your context code in a independent file:**

```jsx
// context.jsx
import React from "react";

export const StateContext = React.createContext({});

export const DispatchContext = React.createContext(null);

export const OtherContext = React.createContext();
```

**In the end, in your child components you can access your global state and global dispatch with `useContext`:**

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

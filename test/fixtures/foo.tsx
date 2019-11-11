import { useReducer } from "react";
import useRootReducer from "../../src/index";
import { nameReducer, listReducer } from "./reducer";

const Foo = () => {
  const [rootState, rootDispatch] = useRootReducer({
    name: useReducer(nameReducer, "foo"),
    list: useReducer(listReducer, [])
  });

  return { rootState, rootDispatch };
};

export default Foo;

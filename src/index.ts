import {
  Reducer,
  ReducerState,
  Dispatch,
  ReducerAction,
  useCallback
} from "react";

interface IReducerMap<A> {
  [key: string]: [
    ReducerState<Reducer<any, A>>,
    Dispatch<ReducerAction<Reducer<any, A>>>
  ];
}

type RootReduceAction<T> = T extends IReducerMap<infer A> ? A : never;

type RootReduceState<T extends IReducerMap<any>> = {
  [K in keyof T]: T[K][0];
};

export default function useRootReducer<T extends IReducerMap<any>>(
  reducerMap: T
): [RootReduceState<T>, Dispatch<RootReduceAction<T>>] {
  if (!reducerMap) {
    throw new Error("useRootReducer: please pass useReducers argv");
  }
  const rootStateKeys = Object.keys(reducerMap);
  const rootState = rootStateKeys.reduce(
    (lastState, key) => ({
      ...lastState,
      [key]: reducerMap[key][0]
    }),
    {} as RootReduceState<T>
  );

  const useRootReducerDispatch = useCallback((action: RootReduceAction<T>) => {
    rootStateKeys.forEach(key => {
      const fn = reducerMap[key][1];
      fn(action);
    });
  }, rootStateKeys);

  return [rootState, useRootReducerDispatch];
}

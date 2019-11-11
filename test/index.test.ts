import { renderHook, act } from "@testing-library/react-hooks";
import useRootReducer from "../src/index";
import Foo from "./fixtures/foo";
import {
  nameResetAction,
  nameUpdateAction,
  listAddAction,
  listDeleteAction
} from "./fixtures/action";

describe("src/index.ts", () => {
  it("should throw error when no argv", () => {
    expect(() => {
      useRootReducer(undefined);
    }).toThrow("useRootReducer: please pass useReducers argv");
  });

  it("should return the same root dispatch after rerender", () => {
    const { result, rerender } = renderHook(Foo);

    const rootDispatchFoo = result.current.rootDispatch;

    rerender();

    const rootDispatchBar = result.current.rootDispatch;

    expect(rootDispatchFoo).toBe(rootDispatchBar);
  });

  it("should return correct state", () => {
    const { result } = renderHook(Foo);

    expect(result.current.rootState).toEqual({
      name: "foo",
      list: []
    });

    act(() => {
      result.current.rootDispatch(nameUpdateAction("bar"));
    });

    expect(result.current.rootState).toEqual({
      name: "bar",
      list: []
    });

    act(() => {
      result.current.rootDispatch(nameResetAction());
    });

    expect(result.current.rootState).toEqual({
      name: "foo",
      list: []
    });

    act(() => {
      result.current.rootDispatch(listAddAction({ id: 1 }));
    });

    expect(result.current.rootState).toEqual({
      name: "foo",
      list: [{ id: 1 }]
    });

    act(() => {
      result.current.rootDispatch(listDeleteAction({ id: 1 }));
    });

    expect(result.current.rootState).toEqual({
      name: "foo",
      list: []
    });
  });
});

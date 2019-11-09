import useRootReducer from "../src/index";

describe("src/index.ts", () => {
  it("should throw error when no argv", () => {
    expect(() => {
      useRootReducer(undefined);
    }).toThrow("useRootReducer: please pass useReducers argv");
  });

  it("should return correct state and call each dispatch", () => {
    const funcA = jest.fn();
    const funcB = jest.fn();
    const [rootState, globalDispatch] = useRootReducer({
      foo: ["bar", funcA],
      bar: ["foo", funcB]
    });

    const action = {
      type: "foo",
      payload: "bar"
    };

    globalDispatch(action);

    expect(rootState).toEqual({
      foo: "bar",
      bar: "foo"
    });

    expect(funcA.mock.calls.length).toBe(1);
    expect(funcB.mock.calls.length).toBe(1);
    expect(funcA.mock.calls[0][0]).toEqual(action);
    expect(funcB.mock.calls[0][0]).toEqual(action);
  });

  it("should return the same global dispatch", () => {
    const [_, globalDispatchFoo] = useRootReducer({
      foo: ["bar", () => {}],
      bar: ["foo", () => {}]
    });

    const [__, globalDispatchBar] = useRootReducer({
      foo: ["bar", () => {}],
      bar: ["foo", () => {}]
    });

    expect(globalDispatchFoo).toBe(globalDispatchBar);
  });
});

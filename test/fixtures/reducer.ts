import { NameAction, ListAction } from "./action";

export function nameReducer(state: string, action: NameAction) {
  switch (action.type) {
    case "name/reset":
    case "name/update":
      return action.payload;
    default:
      return state;
  }
}

export function listReducer(state: { id: number }[], action: ListAction) {
  switch (action.type) {
    case "list/add":
      return [...state, action.payload];
    case "list/delete":
      return state.filter(({ id }) => id !== action.payload.id);
    default:
      return state;
  }
}

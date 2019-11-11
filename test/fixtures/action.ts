export type NameAction = {
  type: "name/update" | "name/reset";
  payload: string;
};

export type ListAction = {
  type: "list/add" | "list/delete";
  payload: { id: number };
};

export const nameUpdateAction = (payload: string): NameAction => ({
  type: "name/update",
  payload
});

export const nameResetAction = (): NameAction => ({
  type: "name/reset",
  payload: "foo"
});

export const listAddAction = (payload: { id: number }): ListAction => ({
  type: "list/add",
  payload
});

export const listDeleteAction = (payload: { id: number }): ListAction => ({
  type: "list/delete",
  payload
});

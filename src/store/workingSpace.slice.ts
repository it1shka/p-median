import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Position = {
  x: number;
  y: number;
};

export type Entity = {
  id: number;
  kind: "consumer" | "producer";
} & Position;

export type WorkingSpaceState = {
  popup: Position | null;
  entities: Entity[];
};

type SetPopupAction = PayloadAction<WorkingSpaceState["popup"]>;
type AppendEntityAction = PayloadAction<Entity>;

const initialState: WorkingSpaceState = {
  popup: null,
  entities: [],
};

const workingSpaceSlice = createSlice({
  name: "workingSpace",
  initialState,
  reducers: {
    setPopup: (state, { payload }: SetPopupAction) => {
      state.popup = payload;
    },
    appendEntity: (state, { payload }: AppendEntityAction) => {
      state.entities.push(payload);
    },
  },
});

export default workingSpaceSlice.reducer;
export const {
  setPopup,
  appendEntity,
} = workingSpaceSlice.actions;

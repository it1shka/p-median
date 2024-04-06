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
  menuAt: Entity["id"] | null;
  entities: Entity[];
};

type SetPopupAction = PayloadAction<WorkingSpaceState["popup"]>;
type AppendEntityAction = PayloadAction<Entity>;
type RemoveEntityAction = PayloadAction<Entity["id"]>;
type SetMenuAtAction = PayloadAction<WorkingSpaceState["menuAt"]>;
type ToggleMenuAtAction = PayloadAction<Entity["id"]>;

const initialState: WorkingSpaceState = {
  popup: null,
  menuAt: null,
  entities: [],
};

const workingSpaceSlice = createSlice({
  name: "workingSpace",
  initialState,
  reducers: {
    setPopup: (state, { payload }: SetPopupAction) => {
      state.popup = payload;
    },
    setMenuAt: (state, { payload }: SetMenuAtAction) => {
      state.menuAt = payload;
    },
    toggleMenuAt: (state, { payload }: ToggleMenuAtAction) => {
      state.menuAt = state.menuAt === payload ? null : payload;
    },
    appendEntity: (state, { payload }: AppendEntityAction) => {
      const filteredEntities = state.entities.filter(({ id }) => {
        return id !== payload.id;
      });
      return {
        ...state,
        entities: [...filteredEntities, payload],
      };
    },
    removeEntity: (state, { payload }: RemoveEntityAction) => ({
      ...state,
      entities: state.entities.filter(({ id }) => payload !== id),
    }),
  },
});

export default workingSpaceSlice.reducer;
export const {
  setPopup,
  setMenuAt,
  toggleMenuAt,
  appendEntity,
  removeEntity,
} = workingSpaceSlice.actions;

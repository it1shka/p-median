import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Position = {
  x: number;
  y: number;
};

export type Entity = {
  id: number;
  kind: "consumer" | "producer";
} & Position;

export type Connection = [Entity["id"], Entity["id"]];

export type WorkingSpaceState = {
  popup: Position | null;
  menuAt: Entity["id"] | null;
  entities: Entity[];
  connectionTarget: Entity | null;
  connections: Connection[];
};

type SetPopupAction = PayloadAction<WorkingSpaceState["popup"]>;
type AppendEntityAction = PayloadAction<Entity>;
type RemoveEntityAction = PayloadAction<Entity["id"]>;
type SetMenuAtAction = PayloadAction<WorkingSpaceState["menuAt"]>;
type ToggleMenuAtAction = PayloadAction<Entity["id"]>;
type SwapEntityAction = PayloadAction<Entity["id"]>;
type SetConnectionTargetAction = PayloadAction<
  WorkingSpaceState["connectionTarget"]
>;
type AddConnectionAction = PayloadAction<Connection>;
type FinishConnectionAction = PayloadAction<Entity["id"]>;
type SetConnectionsAction = PayloadAction<Connection[]>;

const initialState: WorkingSpaceState = {
  popup: null,
  menuAt: null,
  entities: [],
  connectionTarget: null,
  connections: [],
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
      connections: state.connections.filter(conn => !conn.includes(payload)),
    }),
    swapEntity: (state, { payload }: SwapEntityAction) => {
      const target = state
        .entities
        .filter(({ id }) => id === payload)
        .pop();
      if (!target) return;
      target.kind = target.kind === "consumer" ? "producer" : "consumer";
      state.connections = state.connections.filter((conn) =>
        !conn.includes(payload)
      );
    },
    setConnectionTarget: (state, { payload }: SetConnectionTargetAction) => {
      state.connectionTarget = payload;
    },
    addConnection: (state, { payload }: AddConnectionAction) => {
      state.connections.push(payload);
    },
    finishConnection: (state, { payload }: FinishConnectionAction) => {
      if (!state.connectionTarget) return;
      state.connections.push([state.connectionTarget.id, payload]);
      state.connectionTarget = null;
    },
    setConnections: (state, { payload }: SetConnectionsAction) => {
      state.connections = payload;
    },
  },
});

export default workingSpaceSlice.reducer;
export const {
  setPopup,
  setMenuAt,
  toggleMenuAt,
  appendEntity,
  removeEntity,
  swapEntity,
  setConnectionTarget,
  addConnection,
  finishConnection,
  setConnections,
} = workingSpaceSlice.actions;

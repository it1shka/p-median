import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entity } from "./workingSpace.slice";

type SidePanelState = {
  isOpen: boolean;
  genSampleSize: number;
  genType: Entity["kind"];
};

const initialState: SidePanelState = {
  isOpen: false,
  genSampleSize: 10,
  genType: "consumer",
};

type SetGenTypeAction = PayloadAction<Entity["kind"]>;
type SetGenSampleSizeAction = PayloadAction<number>;

const sidePanelSlice = createSlice({
  name: "sidePanel",
  initialState,
  reducers: {
    toggleSidePanel: (state) => ({
      ...state,
      isOpen: !state.isOpen,
    }),
    setGenSampleSize: (state, { payload }: SetGenSampleSizeAction) => {
      state.genSampleSize = payload;
    },
    setGenType: (state, { payload }: SetGenTypeAction) => {
      state.genType = payload;
    },
  },
});

export default sidePanelSlice.reducer;
export const {
  toggleSidePanel,
  setGenSampleSize,
  setGenType,
} = sidePanelSlice.actions;

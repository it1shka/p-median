import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entity } from "./workingSpace.slice";

type SidePanelState = {
  isOpen: boolean;
  genSampleSize: number;
  genType: Entity["kind"];
  pValue: number
};

const initialState: SidePanelState = {
  isOpen: false,
  genSampleSize: 10,
  genType: "consumer",
  pValue: 1,
};

type SetGenTypeAction = PayloadAction<Entity["kind"]>;
type SetGenSampleSizeAction = PayloadAction<number>;
type SetPValueAction = PayloadAction<number>;

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
    setPValue: (state, { payload }: SetPValueAction) => {
      state.pValue = payload;
    }
  },
});

export default sidePanelSlice.reducer;
export const {
  toggleSidePanel,
  setGenSampleSize,
  setGenType,
  setPValue,
} = sidePanelSlice.actions;

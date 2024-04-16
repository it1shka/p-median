import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entity } from "./workingSpace.slice";
import { AlgorithmID } from "../algorithms";

type SidePanelState = {
  isOpen: boolean;
  genSampleSize: number;
  genType: Entity["kind"];
  pValue: number;
  chosenAlgorithm: AlgorithmID | null;
  algorithmChoose: boolean;
  algorithmPlay: boolean;
};

const initialState: SidePanelState = {
  isOpen: false,
  genSampleSize: 10,
  genType: "consumer",
  pValue: 1,
  chosenAlgorithm: null,
  algorithmChoose: false,
  algorithmPlay: false,
};

type SetGenTypeAction = PayloadAction<Entity["kind"]>;
type SetGenSampleSizeAction = PayloadAction<number>;
type SetPValueAction = PayloadAction<number>;
type SetAlgorithmAction = PayloadAction<AlgorithmID>;
type SetAlgorithmChooseAction = PayloadAction<boolean>;

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
    },
    setAlgorithm: (state, { payload }: SetAlgorithmAction) => {
      state.chosenAlgorithm = payload;
    },
    setAlgorithmChoose: (state, { payload }: SetAlgorithmChooseAction) => {
      state.algorithmChoose = payload;
    },
    toggleAlgorithmPlay: (state) => {
      state.algorithmPlay = !state.algorithmPlay;
    },
  },
});

export default sidePanelSlice.reducer;
export const {
  toggleSidePanel,
  setGenSampleSize,
  setGenType,
  setPValue,
  setAlgorithm,
  setAlgorithmChoose,
  toggleAlgorithmPlay,
} = sidePanelSlice.actions;

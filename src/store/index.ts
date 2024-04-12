import { configureStore } from "@reduxjs/toolkit";
import workingSpace from "./workingSpace.slice";
import sidePanel from "./sidePanel.slice";

const store = configureStore({
  reducer: {
    workingSpace,
    sidePanel,
  },
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

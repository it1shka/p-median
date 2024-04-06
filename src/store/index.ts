import { configureStore } from "@reduxjs/toolkit";
import workingSpace from "./workingSpace.slice";

const store = configureStore({
  reducer: {
    workingSpace,
  },
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

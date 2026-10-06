import { configureStore } from "@reduxjs/toolkit";
import candyCrushSlice from "./candyCrushSlice";

export const store = configureStore({
  reducer: {
    candyCrush: candyCrushSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

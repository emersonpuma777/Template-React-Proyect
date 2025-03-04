import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import navigateReducer from "../slices/navigateSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    navigate: navigateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

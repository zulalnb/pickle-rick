import { configureStore } from "@reduxjs/toolkit";
import { locationsAPI } from "../services/locationApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [locationsAPI.reducerPath]: locationsAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(locationsAPI.middleware),
  });
};

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

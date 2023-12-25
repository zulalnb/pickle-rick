import { configureStore } from "@reduxjs/toolkit";
import { locationsAPI } from "../services/locationApi";
import favoriteSlice from "../features/favoriteSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      favorites: favoriteSlice,
      [locationsAPI.reducerPath]: locationsAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(locationsAPI.middleware),
  });
};

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

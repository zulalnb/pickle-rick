import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Character } from "@/types/characters";

const favorites =
  typeof window !== "undefined"
    ? window.localStorage.getItem("favorites")
    : null;

const initialState: Character[] = favorites ? JSON.parse(favorites) : [];

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Character>) => {
      const isFavorite = state.find((item) => item.id == action.payload.id);
      if (isFavorite) {
        const newState = state.filter((item) => item.id !== action.payload.id);
        if (typeof window !== "undefined") {
          window.localStorage.setItem("favorites", JSON.stringify(newState));
        }
        return newState;
      } else {
        const newState = [...state, action.payload];
        if (typeof window !== "undefined") {
          window.localStorage.setItem("favorites", JSON.stringify(newState));
        }
        return newState;
      }
    },
  },
});

export default favoriteSlice.reducer;
export const { toggleFavorite } = favoriteSlice.actions;

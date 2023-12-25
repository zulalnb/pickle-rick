import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Character } from "@/types/characters";

const initialState: Character[] = [];

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Character>) => {
      const isFavorite = state.find((item) => item.id == action.payload.id);
      if (isFavorite) {
        return state.filter((item) => item.id !== action.payload.id);
      } else {
        state.push(action.payload);
      }
    },
  },
});

export default favoriteSlice.reducer;
export const { toggleFavorite } = favoriteSlice.actions;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLocations = createAsyncThunk(
  "user/getLocations",
  async () => {
    const response = await axios.get<Location>(
      `https://rickandmortyapi.com/api/location?page=1`
    );
    return response.data;
  }
);

export interface Info {
  count: number;
  pages: number; //mapping yap
  next: string | null;
  prev: string | null;
}

export interface Result {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

export interface Location {
  info: Info;
  results: Result[];
}

interface LocationState {
  data: Location | null;
  loading: boolean;
  error: string;
}

const initialState: LocationState = {
  data: null,
  loading: false,
  error: "",
};

/* interface initState {
  value: string;
}

const initialState: initState = {
  value: "gsgsg",
}; */

const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    testAction: () => {
      console.log("test");
    },
  },
   extraReducers: (builder) => {
    builder.addCase(fetchLocations.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchLocations.fulfilled, (state, action: PayloadAction<Location>) => {
      console.log(action.payload);
      
      state.loading = false;
      state.error = "";
    });
  },
});

export const { testAction } = locationSlice.actions;
export default locationSlice.reducer;

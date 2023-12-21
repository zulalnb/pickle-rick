// Import the createApi and fetchBaseQuery functions from the RTK Query library
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Locations } from "@/types/locations";
import { Characters } from "@/types/characters";

export const locationsAPI = createApi({
  reducerPath: "locationsAPI",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://rickandmortyapi.com/api",
  }),
  endpoints: (builder) => ({
    getLocationsByPage: builder.query<Locations, number | void>({
      query: (page = 1) => `location?page=${page}`,
    }),
    getCharactersByLocation: builder.query<
      Characters,
      { id: number; page: number }
    >({
      query: ({ id, page }) => `character?location=${id}&page=${page}`,
    }),
  }),
});

export const { useGetLocationsByPageQuery, useGetCharactersByLocationQuery } =
  locationsAPI;

export const { getLocationsByPage, getCharactersByLocation } =
  locationsAPI.endpoints;

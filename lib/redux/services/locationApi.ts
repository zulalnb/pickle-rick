// Import the createApi and fetchBaseQuery functions from the RTK Query library
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Locations } from "@/types/locations";

export const locationsAPI = createApi({
  reducerPath: "locationsAPI",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://rickandmortyapi.com/api",
  }),
  endpoints: (builder) => ({
    getLocationsByPage: builder.query<Locations, number | void>({
      query: (page = 1) => `location?page=${page}`,
    }),
    getLocationDetail: builder.query<any, number | void>({
      query: (id) => `location/${id}`,
    }),
  }),
});

export const { useGetLocationsByPageQuery } = locationsAPI;

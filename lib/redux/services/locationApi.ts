// Import the createApi and fetchBaseQuery functions from the RTK Query library
import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Location, Locations } from "@/types/locations";
import { Character, CharacterDetail, Characters } from "@/types/characters";
import { Status } from "@/types/general";

const paginateData = (data: any, page: number, itemsPerPage: number) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
};

export const locationsAPI = createApi({
  reducerPath: "locationsAPI",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://rickandmortyapi.com/api",
  }),
  endpoints: (builder) => ({
    getLocationsByPage: builder.query<Locations, number>({
      // query: (page = 1) => `location/?page=${page}`,
      queryFn: async (arg, _queryApi, _extraOptions, fetchWithBQ) => {
        let endpoint = "location";

        const res = await fetchWithBQ(endpoint);

        const locations = res.data as Locations;

        const pageArray = Array.from(
          { length: locations.info.pages },
          (_, index) => index + 1
        );

        let allLocations: Location[] = [];
        await Promise.all(
          pageArray.map(async (pageNumber) => {
            const pageres = await fetchWithBQ(
              `${endpoint}/?page=${pageNumber}`
            );

            const pagedata = pageres.data as Locations;

            allLocations.push(...pagedata.results);
          })
        );

        const data = paginateData(allLocations, arg, 3);

        locations.info.pages = 3;
        locations.info.next = null;
        locations.info.prev = null;

        locations.results = data;

        return { data: locations as Locations };
      },
    }),
    getCharactersByLocation: builder.query<
      Characters,
      { id: number; status: string; page: number }
    >({
      queryFn: async (arg, _queryApi, _extraOptions, fetchWithBQ) => {
        let endpoint = "character";

        if (arg.status !== "all")
          endpoint = endpoint + `/?status=${arg.status}`;

        const res = await fetchWithBQ(endpoint);

        const characters = res.data as Characters;

        const pageArray = Array.from(
          { length: characters.info.pages },
          (_, index) => index + 1
        );

        let allCharacters: Character[] = [];
        await Promise.all(
          pageArray.map(async (pageNumber) => {
            const query = `${endpoint}${
              arg.status === "all" ? "/?" : "&"
            }page=${pageNumber}`;
            const pageres = await fetchWithBQ(query);
            const pagedata = pageres.data as Characters;
            const charactersByLocations = pagedata.results.filter(
              (character) => {
                return (
                  Number(character.location.url.split("/").slice(-1)) === arg.id
                );
              }
            );
            allCharacters.push(...charactersByLocations);
          })
        );

        const data = paginateData(allCharacters, arg.page, 3);

        characters.info.count = allCharacters.length;
        characters.info.pages = 3;
        characters.info.next = null;
        characters.info.prev = null;

        characters.results = data;

        return { data: characters as Characters };
      },
    }),
  }),
});

export const { useGetLocationsByPageQuery, useGetCharactersByLocationQuery } =
  locationsAPI;

export const { getLocationsByPage, getCharactersByLocation } =
  locationsAPI.endpoints;

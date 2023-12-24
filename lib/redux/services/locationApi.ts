// Import the createApi and fetchBaseQuery functions from the RTK Query library
import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Location, Locations } from "@/types/locations";
import { Character, Characters } from "@/types/characters";
import { Status } from "@/types/general";

const paginateData = (data: any, page: number, itemsPerPage: number) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
};

const calculateTotalPages = (
  totalItems: number,
  itemsPerPage: number
): number => {
  return Math.ceil(totalItems / itemsPerPage);
};

const chooseRandomItems = (inputArray: any[]): any[] => {
  // Check if the inputArray is empty or has fewer than 3 items
  if (inputArray.length < 3) {
    return inputArray;
  }

  // Shuffle the inputArray
  const shuffledArray = [...inputArray].sort(() => Math.random() - 0.5);

  // Choose the first two items from the shuffled array
  const randomItems = shuffledArray.slice(0, 2);

  return randomItems;
};

const itemsPerPage = 3;

type More = {
  character?: number;
};

export const locationsAPI = createApi({
  reducerPath: "locationsAPI",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://rickandmortyapi.com/api",
  }),
  endpoints: (builder) => ({
    getLocationsByPage: builder.query<Locations, number>({
      queryFn: async (page = 1, _queryApi, _extraOptions, fetchWithBQ) => {
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

        const data = paginateData(allLocations, page, 3);

        const pageCount = calculateTotalPages(
          allLocations.length,
          itemsPerPage
        );

        locations.info.pages = pageCount;
        locations.info.next = page === pageCount ? null : (page + 1).toString();
        locations.info.prev = page === 1 ? null : (page + 1).toString();
        locations.info.count = allLocations.length;

        locations.results = data;

        return { data: locations as Locations };
      },
    }),
    getCharactersByLocation: builder.query<
      Characters,
      { id: number; status?: string; page?: number; all?: More }
    >({
      queryFn: async (
        { id, status = "all", page = 1, all = {} },
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ) => {
        let endpoint = "character";

        if (status !== "all") endpoint = endpoint + `/?status=${status}`;

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
              status === "all" ? "/?" : "&"
            }page=${pageNumber}`;
            const pageres = await fetchWithBQ(query);
            const pagedata = pageres.data as Characters;
            const charactersByLocations = pagedata.results.filter(
              (character) => {
                return (
                  Number(character.location.url.split("/").slice(-1)) === id
                );
              }
            );
            allCharacters.push(...charactersByLocations);
          })
        );

        const data = !all.character
          ? paginateData(allCharacters, page, itemsPerPage)
          : chooseRandomItems(
              allCharacters.filter(
                (character: Character) => character.id !== all.character
              )
            );

        const pageCount = calculateTotalPages(
          allCharacters.length,
          itemsPerPage
        );

        characters.info.count = allCharacters.length;
        characters.info.pages = pageCount;
        characters.info.next =
          page === pageCount ? null : (page + 1).toString();
        characters.info.prev = page === 1 ? null : (page + 1).toString();

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

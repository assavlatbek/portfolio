import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { ENDIPOINT, TOKEN } from "../../constant";

export const experienceService = createApi({
  reducerPath: "experiences",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDIPOINT}api/v1/`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getExperiences: builder.query({
      query: (params) =>
        `experiences?page=${params.page}&search=${params.search}`,
      transformResponse: (res) => res,
    }),
    getExperience: builder.mutation({
      query: (id) => ({
        url: `experiences/${id}`,
        method: "GET",
      }),
    }),
    addExperience: builder.mutation({
      query: (body) => ({
        url: "experiences",
        method: "POST",
        body,
      }),
    }),
    updateExperience: builder.mutation({
      query: ({ id, body }) => ({
        url: `experiences/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `experiences/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetExperiencesQuery,
  useGetExperienceMutation,
  useAddExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = experienceService;

export default experienceService.reducer;

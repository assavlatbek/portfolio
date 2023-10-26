import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { ENDIPOINT, TOKEN } from "../../constant";

export const educationService = createApi({
  reducerPath: "education",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDIPOINT}api/v1/`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getEducations: builder.query({
      query: (params) =>
        `education?page=${params.page}&search=${params.search}`,
      transformResponse: (res) => res,
    }),
    getEducation: builder.mutation({
      query: (id) => ({
        url: `education/${id}`,
        method: "GET",
      }),
    }),
    addEducation: builder.mutation({
      query: (body) => ({
        url: "education",
        method: "POST",
        body,
      }),
    }),
    updateEducation: builder.mutation({
      query: ({ id, body }) => ({
        url: `education/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteEducation: builder.mutation({
      query: (id) => ({
        url: `education/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetEducationsQuery,
  useGetEducationMutation,
  useAddEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
} = educationService;

export default educationService.reducer;

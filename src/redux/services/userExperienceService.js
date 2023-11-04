import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { ENDIPOINT, TOKEN } from "../../constant";

export const userExperienceService = createApi({
  reducerPath: "as-experience",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDIPOINT}api/v1/`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserExperiences: builder.query({
      query: (params) =>
        `experiences?user=${params.id}&page=${params.page}&search=${params.search}`,
      transformResponse: (res) => res,
    }),
    getUserExperience: builder.mutation({
      query: (id) => ({
        url: `experiences/${id}`,
        method: "GET",
      }),
    }),
    addUserExperience: builder.mutation({
      query: (body) => ({
        url: "experiences",
        method: "POST",
        body,
      }),
    }),
    updateUserExperience: builder.mutation({
      query: ({ id, body }) => ({
        url: `experiences/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteUserExperience: builder.mutation({
      query: (id) => ({
        url: `experiences/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUserExperiencesQuery,
  useGetUserExperienceMutation,
  useAddUserExperienceMutation,
  useUpdateUserExperienceMutation,
  useDeleteUserExperienceMutation,
} = userExperienceService;

export default userExperienceService.reducer;

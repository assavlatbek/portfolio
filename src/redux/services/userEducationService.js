import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { ENDIPOINT, TOKEN } from "../../constant";

export const userEducationService = createApi({
  reducerPath: "as-education",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDIPOINT}api/v1/`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserEducations: builder.query({
      query: (params) =>
        `education?user=${params.id}&page=${params.page}&search=${params.search}`,
      transformResponse: (res) => res,
    }),
    getUserEducation: builder.mutation({
      query: (id) => ({
        url: `education/${id}`,
        method: "GET",
      }),
    }),
    addUserEducation: builder.mutation({
      query: (body) => ({
        url: "education",
        method: "POST",
        body,
      }),
    }),
    updateUserEducation: builder.mutation({
      query: ({ id, body }) => ({
        url: `education/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteUserEducation: builder.mutation({
      query: (id) => ({
        url: `education/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUserEducationsQuery,
  useGetUserEducationMutation,
  useAddUserEducationMutation,
  useUpdateUserEducationMutation,
  useDeleteUserEducationMutation,
} = userEducationService;

export default userEducationService.reducer;

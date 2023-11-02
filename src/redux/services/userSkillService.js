import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { ENDIPOINT, TOKEN } from "../../constant";

export const userSkillService = createApi({
  reducerPath: "user-skill",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDIPOINT}api/v1/`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserSkills: builder.query({
      query: (params) =>
        `skills?user=${params.id}&page=${params.page}&search=${params.search}`,
      transformResponse: (res) => res,
    }),
    getUserSkill: builder.mutation({
      query: (id) => ({
        url: `skills/${id}`,
        method: "GET",
      }),
    }),
    addUserSkill: builder.mutation({
      query: (body) => ({
        url: "skills",
        method: "POST",
        body,
      }),
    }),
    updateUserSkill: builder.mutation({
      query: ({ id, body }) => ({
        url: `skills/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteUserSkill: builder.mutation({
      query: (id) => ({
        url: `skills/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUserSkillsQuery,
  useGetUserSkillMutation,
  useAddUserSkillMutation,
  useUpdateUserSkillMutation,
  useDeleteUserSkillMutation,
} = userSkillService;

export default userSkillService.reducer;

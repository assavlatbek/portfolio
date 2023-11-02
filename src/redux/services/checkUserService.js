import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { ENDIPOINT, TOKEN } from "../../constant";

export const checkUserService = createApi({
  reducerPath: "education",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDIPOINT}api/v1/`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `users/${id}`,
      transformResponse: (res) => res,
    }),
  }),
});

export const { useGetUserQuery } = checkUserService;

export default checkUserService.reducer;

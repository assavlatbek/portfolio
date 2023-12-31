import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { ENDIPOINT, TOKEN } from "../../constant";

export const portfolioService = createApi({
  reducerPath: "portfolio",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDIPOINT}api/v1/`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPortfolios: builder.query({
      query: (params) =>
        `portfolios?page=${params.page}&search=${params.search}`,
      transformResponse: (res) => res,
    }),
    getPortfolio: builder.mutation({
      query: (id) => ({
        url: `portfolios/${id}`,
        method: "GET",
      }),
    }),
    addPortfolio: builder.mutation({
      query: (body) => ({
        url: "portfolios",
        method: "POST",
        body,
      }),
    }),
    updatePortfolio: builder.mutation({
      query: ({ id, body }) => ({
        url: `portfolios/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deletePortfolio: builder.mutation({
      query: (id) => ({
        url: `portfolios/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPortfoliosQuery,
  useGetPortfolioMutation,
  useAddPortfolioMutation,
  useUpdatePortfolioMutation,
  useDeletePortfolioMutation,
} = portfolioService;

export default portfolioService.reducer;

import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const detailsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDetails: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),        
    }),
});

export const { useGetDetailsQuery } = detailsApiSlice;
import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => PRODUCTS_URL,
        }),
        keepUnusedDataFor: 5,
    }),
});

export const { useGetProductsQuery } = productApiSlice;

// The above code defines an API slice for fetching products using Redux Toolkit Query.
// It sets up an endpoint to get products from the PRODUCTS_URL and exports a custom hook for use in components.
// The keepUnusedDataFor option is set to 5 seconds to retain unused data for that duration.
// This allows components to access product data efficiently without unnecessary refetching.
// The useGetProductsQuery hook can be used in React components to fetch and manage product data.
// For example, in a component, you can use:
// const { data: products, isLoading, error } = useGetProductsQuery();
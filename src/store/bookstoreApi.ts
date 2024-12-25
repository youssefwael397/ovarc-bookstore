import { IStore } from '@/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookstoreApi = createApi({
  reducerPath: 'bookstoreApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Books', 'Authors', 'Stores'],
  endpoints: (builder) => ({
    fetchBooks: builder.query<any, void>({
      query: () => 'books.json',
      providesTags: ['Books'],
    }),
    fetchAuthors: builder.query<any, void>({
      query: () => 'authors.json',
      providesTags: ['Authors'],
    }),
    fetchStores: builder.query<any, void>({
      query: () => 'stores.json',
      providesTags: ['Stores'],
    }),
  }),
});

export const {
  useFetchBooksQuery,
  useFetchAuthorsQuery,
  useFetchStoresQuery,
} = bookstoreApi;

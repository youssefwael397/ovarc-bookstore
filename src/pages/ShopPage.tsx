import React, { useEffect } from 'react';
import {
  useFetchAuthorsQuery,
  useFetchBooksQuery,
  useFetchStoresQuery,
} from '@/store/bookstoreApi';
import PageSubTitle from '@/components/PageSubTitle';
import BookCard from '@/components/BookCard';
import { IAuthor, IBook, IStore } from '@/types/types';
import AuthorCard from '@/components/AuthorCard';
import { Link } from 'react-router-dom';
import StoreCard from '@/components/StoreCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setBooks } from '@/store/bookSlice';
import { setAuthors } from '@/store/authorsSlice';
import { setStores } from '@/store/storeSlice';

const ShopPage: React.FC = () => {
  const books = useSelector((state: RootState) => state.bookData.books);
  const authors = useSelector((state: RootState) => state.authorsData.authors);
  const stores = useSelector((state: RootState) => state.storeData.stores);

  const dispatch = useDispatch();

  const {
    data: initialBooks,
    isLoading: BooksLoading,
    isError: BooksError,
  } = useFetchBooksQuery();
  const {
    data: initialStores,
    isLoading: StoresLoading,
    isError: StoresError,
  } = useFetchStoresQuery();
  const {
    data: initialAuthors,
    isLoading: AuthorsLoading,
    isError: AuthorsError,
  } = useFetchAuthorsQuery();

  useEffect(() => {
    if (!books.length && initialBooks) {
      dispatch(setBooks(initialBooks));
    }
  }, [dispatch, books, initialBooks]);

  useEffect(() => {
    if (!authors.length && initialAuthors) {
      dispatch(setAuthors(initialAuthors));
    }
  }, [dispatch, authors, initialAuthors]);

  useEffect(() => {
    if (!stores.length && initialStores) {
      dispatch(setStores(initialStores));
    }
  }, [dispatch, stores, initialStores]);

  if (BooksLoading || StoresLoading || AuthorsLoading)
    return <div>Loading...</div>;
  if (BooksError || StoresError || AuthorsError)
    return <div>Error fetching books.</div>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center">
        <PageSubTitle title="Browse by Stores" />
        <Link
          to={'/shop/stores'}
          className="rounded-[4px] p-2 bg-[#D86128] text-white"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {stores.slice(0, 3).map((store: IStore) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>

      <div className="flex flex-row justify-between items-center">
        <PageSubTitle title="Browse by Authors" />
        <Link
          to={'/shop/authors'}
          className="rounded-[4px] p-2 bg-[#D86128] text-white"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {authors.slice(0, 3).map((author: IAuthor) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </div>

      <div className="flex flex-row justify-between items-center">
        <PageSubTitle title="Browse by Books" />
        <Link
          to={'/shop/books'}
          className="rounded-[4px] p-2 bg-[#D86128] text-white"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {books.slice(0, 3).map((book: IBook) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;

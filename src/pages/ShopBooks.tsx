import React, { useEffect } from 'react';
import { useFetchBooksQuery } from '@/store/bookstoreApi';
import PageSubTitle from '@/components/PageSubTitle';
import BookCard from '@/components/BookCard';
import { IBook } from '@/types/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setBooks } from '@/store/bookSlice';

const ShopPageBooks: React.FC = () => {
  const books = useSelector((state: RootState) => state.bookData.books);
  const dispatch = useDispatch();

  const {
    data: initialBooks,
    isLoading: BooksLoading,
    isError: BooksError,
  } = useFetchBooksQuery();

  useEffect(() => {
    if (!books.length && initialBooks) {
      dispatch(setBooks(initialBooks));
    }
  }, [dispatch, books, initialBooks]);

  if (BooksLoading) return <div>Loading...</div>;
  if (BooksError) return <div>Error fetching books.</div>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center">
        <PageSubTitle title="Browse All Books" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {books.map((book: IBook) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default ShopPageBooks;

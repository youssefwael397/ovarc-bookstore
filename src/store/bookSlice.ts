import { IBook } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface BookState {
  books: IBook[];
}

// Helper function to save books to localStorage
const saveBooksToLocalStorage = (books: IBook[]) => {
  localStorage.setItem('books', JSON.stringify(books));
};

// Helper function to load books from localStorage
const loadBooksFromLocalStorage = (): IBook[] => {
  const books = localStorage.getItem('books');
  return books ? JSON.parse(books) : [];
};

const initialState: BookState = {
  books: loadBooksFromLocalStorage(), // Initialize from localStorage
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks(state, action: PayloadAction<IBook[]>) {
      state.books = action.payload;
      saveBooksToLocalStorage(state.books); // Save books to localStorage
    },
    addBook(state, action: PayloadAction<IBook>) {
      state.books.push(action.payload);
      saveBooksToLocalStorage(state.books); // Save updated books to localStorage
    },
    updateBook(state, action: PayloadAction<IBook>) {
      const index = state.books.findIndex(
        (book) => book.id === action.payload.id
      );
      if (index !== -1) {
        state.books[index] = action.payload;
        saveBooksToLocalStorage(state.books); // Save updated books to localStorage
      }
    },
    deleteBook(state, action: PayloadAction<string>) {
      state.books = state.books.filter((book) => book.id !== action.payload);
      saveBooksToLocalStorage(state.books); // Save updated books to localStorage
    },
  },
});

export const { setBooks, addBook, updateBook, deleteBook } = bookSlice.actions;
export default bookSlice.reducer;

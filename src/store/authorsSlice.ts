import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthor } from '@/types/types';

// Load authors from localStorage if available and valid
const loadAuthorsFromLocalStorage = (): IAuthor[] => {
  try {
    const storedAuthors = localStorage.getItem('authors');
    // If storedAuthors is not null, parse it; otherwise, return an empty array
    return storedAuthors ? JSON.parse(storedAuthors) : [];
  } catch (error) {
    // In case of error during parsing (e.g., corrupted data), return an empty array
    console.error('Error loading authors from localStorage', error);
    return [];
  }
};

// Define the initial state shape
interface AuthorsState {
  authors: IAuthor[];
  loading: boolean;
  error: string | null;
}

const initialState: AuthorsState = {
  authors: loadAuthorsFromLocalStorage(), // Load from localStorage initially
  loading: false,
  error: null,
};

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    setAuthors(state, action: PayloadAction<IAuthor[]>) {
      state.authors = action.payload;
      localStorage.setItem('authors', JSON.stringify(state.authors)); // Save to localStorage
    },
    addAuthor(state, action: PayloadAction<IAuthor>) {
      state.authors.push(action.payload);
      localStorage.setItem('authors', JSON.stringify(state.authors)); // Save to localStorage
    },
    updateAuthor(state, action: PayloadAction<IAuthor>) {
      const index = state.authors.findIndex(
        (author) => author.id === action.payload.id
      );
      if (index !== -1) {
        state.authors[index] = action.payload;
        localStorage.setItem('authors', JSON.stringify(state.authors)); // Save to localStorage
      }
    },
    deleteAuthor(state, action: PayloadAction<number>) {
      state.authors = state.authors.filter(
        (author) => author.id !== action.payload
      );
      localStorage.setItem('authors', JSON.stringify(state.authors)); // Save to localStorage
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const {
  setAuthors,
  addAuthor,
  updateAuthor,
  deleteAuthor,
  setLoading,
  setError,
} = authorsSlice.actions;

export default authorsSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStore } from '@/types/types';

// Define the initial state shape
interface StoreState {
  stores: IStore[];
  loading: boolean;
  error: string | null;
}

// Function to load the state from localStorage
const loadStateFromLocalStorage = (): IStore[] => {
  const savedStores = localStorage.getItem('stores');
  return savedStores ? JSON.parse(savedStores) : [];
};

// Set the initial state
const initialState: StoreState = {
  stores: loadStateFromLocalStorage(), // Load initial state from localStorage
  loading: false,
  error: null,
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setStores(state, action: PayloadAction<IStore[]>) {
      state.stores = action.payload;
      // Save to localStorage whenever stores are updated
      localStorage.setItem('stores', JSON.stringify(action.payload));
    },
    addStore(state, action: PayloadAction<IStore>) {
      state.stores.push(action.payload);
      // Save to localStorage
      localStorage.setItem('stores', JSON.stringify(state.stores));
    },
    updateStore(state, action: PayloadAction<IStore>) {
      const index = state.stores.findIndex(
        (store) => store.id === action.payload.id
      );
      if (index !== -1) {
        state.stores[index] = action.payload;
        // Save to localStorage
        localStorage.setItem('stores', JSON.stringify(state.stores));
      }
    },
    deleteStore(state, action: PayloadAction<number>) {
      state.stores = state.stores.filter(
        (store) => store.id !== action.payload
      );
      // Save to localStorage
      localStorage.setItem('stores', JSON.stringify(state.stores));
    },
  },
});

export const { setStores, addStore, updateStore, deleteStore } =
  storeSlice.actions;

export default storeSlice.reducer;

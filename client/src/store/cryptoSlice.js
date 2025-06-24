import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCryptoData, getAllCryptoData } from '../api/cryptoApi';

export const fetchCryptos = createAsyncThunk(
  'crypto/fetchCryptos',
  async ({ symbols }) => {
    const response = await getCryptoData(symbols);
    return response.data.symbols;
  }
);

export const fetchAllCryptos = createAsyncThunk(
  'crypto/fetchAllCryptos',
  async () => {
    const response = await getAllCryptoData();
    return response.data.result;
  }
);

export const fetchFavoriteCryptos = createAsyncThunk(
  'crypto/fetchFavoriteCryptos',
  async (symbols) => {
    const response = await getCryptoData(symbols.join('+'));
    return response.data.symbols;
  }
);



const initialState = {
  data: [],
  allCryptos: [],
  favorites: [],
  favoriteData: [],
  loading: false,
  error: null,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (symbol) => symbol !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptos.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCryptos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllCryptos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCryptos.fulfilled, (state, action) => {
        state.loading = false;
        state.allCryptos = action.payload;
      })
      .addCase(fetchAllCryptos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFavoriteCryptos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoriteCryptos.fulfilled, (state, action) => {
        state.loading = false;
        state.favoriteData = action.payload;
      })
      .addCase(fetchFavoriteCryptos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addToFavorites, removeFromFavorites } = cryptoSlice.actions;
export default cryptoSlice.reducer;


import { selector } from 'recoil';
import { cryptoState } from '../atoms/cryptoAtoms';
import { getAllCryptoData, getCryptoData } from '../../api/cryptoApi';

// Selector to fetch all cryptos (replaces fetchAllCryptos thunk)
export const fetchAllCryptosSelector = selector({
  key: 'fetchAllCryptosSelector',
  get: async ({ get }) => {
    try {
      const response = await getAllCryptoData();
      return response.data.result;
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

// Selector to fetch cryptos by symbols (replaces fetchCryptos thunk)
export const fetchCryptosSelector = selector({
  key: 'fetchCryptosSelector',
  get: async ({ get }) => {
    const { data } = get(cryptoState);
    if (!data || data.length === 0) return [];
    try {
      const response = await getCryptoData(data.join('+'));
      return response.data.symbols;
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

// Selector to fetch favorite cryptos (replaces fetchFavoriteCryptos thunk)
export const fetchFavoriteCryptosSelector = selector({
  key: 'fetchFavoriteCryptosSelector',
  get: async ({ get }) => {
    const { favorites } = get(cryptoState);
    if (!favorites || favorites.length === 0) return [];
    try {
      const response = await getCryptoData(favorites.join('+'));
      return response.data.symbols;
    } catch (error) {
      throw new Error(error.message);
    }
  },
});


// Add to favorites
export const addToFavorites = ({ set, get }, symbol) => {
  const state = get(cryptoState);
  if (!state.favorites.includes(symbol)) {
    set(cryptoState, {
      ...state,
      favorites: [...state.favorites, symbol],
    });
  }
};

// Remove from favorites
export const removeFromFavorites = ({ set, get }, symbol) => {
  const state = get(cryptoState);
  set(cryptoState, {
    ...state,
    favorites: state.favorites.filter((s) => s !== symbol),
  });
};

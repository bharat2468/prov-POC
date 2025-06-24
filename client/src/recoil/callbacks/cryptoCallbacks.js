import { getAllCryptoData, getCryptoData } from '../../api/cryptoApi';
import { cryptoAtoms } from '../atoms/cryptoAtoms';

export const fetchAllCryptos = async ({ set }) => {
  set(cryptoAtoms, (prev) => ({ ...prev, loading: true, error: null }));
  try {
    const response = await getAllCryptoData();
    set(cryptoAtoms, (prev) => ({
      ...prev,
      allCryptos: response.data.result,
      loading: false,
    }));
  } catch (error) {
    set(cryptoAtoms, (prev) => ({
      ...prev,
      loading: false,
      error: error.message,
    }));
  }
};

export const fetchFavoriteCryptos = async ({ snapshot, set }) => {
  const { favorites } = await snapshot.getPromise(cryptoAtoms);
  if (favorites.length === 0) return;

  set(cryptoAtoms, (prev) => ({ ...prev, loading: true, error: null }));
  try {
    const response = await getCryptoData(favorites.join('+'));
    set(cryptoAtoms, (prev) => ({
      ...prev,
      favoriteData: response.data.symbols,
      loading: false,
    }));
  } catch (error) {
    set(cryptoAtoms, (prev) => ({
      ...prev,
      loading: false,
      error: error.message,
    }));
  }
};

// ✅ NEW: fetchCryptos by symbols
export const fetchCryptos = async ({ set }, symbols) => {
  if (!symbols || symbols.length === 0) return;

  set(cryptoAtoms, (prev) => ({ ...prev, loading: true, error: null }));
  try {
    const response = await getCryptoData(symbols.join('+'));
    set(cryptoAtoms, (prev) => ({
      ...prev,
      data: response.data.symbols,
      loading: false,
    }));
  } catch (error) {
    set(cryptoAtoms, (prev) => ({
      ...prev,
      loading: false,
      error: error.message,
    }));
  }
};

export const addToFavorites = async ({ set, snapshot }, symbol) => {
  const { favorites } = await snapshot.getPromise(cryptoAtoms);
  if (!favorites.includes(symbol)) {
    set(cryptoAtoms, (prev) => ({
      ...prev,
      favorites: [...prev.favorites, symbol],
    }));
  }
};

export const removeFromFavorites = async ({ set, snapshot }, symbol) => {
  const { favorites } = await snapshot.getPromise(cryptoAtoms);
  set(cryptoAtoms, (prev) => ({
    ...prev,
    favorites: favorites.filter((s) => s !== symbol),
  }));
};

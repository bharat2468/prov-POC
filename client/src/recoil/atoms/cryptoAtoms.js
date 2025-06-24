import { atom } from 'recoil';

export const cryptoState = atom({
  key: 'cryptoState',
  default: {
    data: [],
    allCryptos: [],
    favorites: [],
    favoriteData: [],
    loading: false,
    error: null,
  },
});

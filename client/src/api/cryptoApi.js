// cryptoApi.js
import api from "./axiosConfig";

export const getCryptoData = async (symbols) => {
  return await api.get(`/getData?symbol=${symbols}`);
};


export const getAllCryptoData = async () => {
  return await api.get(`/getCryptoList`);
};

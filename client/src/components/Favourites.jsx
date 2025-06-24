import React, { useEffect } from "react";
import { useRecoilState, useRecoilCallback } from "recoil";
import { cryptoAtoms } from "../recoil/atoms/cryptoAtoms";
import { fetchFavoriteCryptos } from "../recoil/callbacks/cryptoCallbacks";
import { Loading } from "./";

const Favorites = () => {
  const [cryptoState] = useRecoilState(cryptoAtoms);
  const { favorites, favoriteData, loading, error } = cryptoState;

  const loadFavorites = useRecoilCallback(({ set, snapshot }) => () => {
    fetchFavoriteCryptos({ set, snapshot });
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      loadFavorites();
    }
  }, [favorites, loadFavorites]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading className="w-32" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">Error: {error}</div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No favorites selected yet.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Favorite Cryptocurrencies</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Symbol</th>
              <th>Name</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {favoriteData.map((coin, index) => (
              <tr key={coin.symbol}>
                <th>{index + 1}</th>
                <td>{coin.symbol}</td>
                <td>{coin.name || "—"}</td>
                <td>{coin.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Favorites;

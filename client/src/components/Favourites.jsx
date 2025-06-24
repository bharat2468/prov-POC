import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteCryptos } from "../store/cryptoSlice";
import { Loading } from "./";

const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites, favoriteData, loading, error } = useSelector(
    (state) => state.crypto
  );

  useEffect(() => {
    if (favorites.length > 0) {
      dispatch(fetchFavoriteCryptos(favorites));
    }
  }, [dispatch, favorites]);

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

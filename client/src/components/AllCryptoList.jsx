import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCryptos,
  addToFavorites,
  removeFromFavorites,
} from "../store/cryptoSlice";
import { Loading } from "./";

const AllCryptoList = () => {
  const dispatch = useDispatch();
  const { allCryptos, favorites, loading, error } = useSelector(
    (state) => state.crypto
  );

  useEffect(() => {
    dispatch(fetchAllCryptos());
  }, [dispatch]);

  const isFavorite = (symbol) => favorites.includes(symbol);

  const handleFavoriteToggle = (symbol) => {
    if (isFavorite(symbol)) {
      dispatch(removeFromFavorites(symbol));
    } else {
      dispatch(addToFavorites(symbol));
    }
  };

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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Cryptocurrencies</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Symbol</th>
              <th>Name</th>
              <th>Source</th>
              <th>Favorite</th>
            </tr>
          </thead>
          <tbody>
            {allCryptos.slice(0, 30).map((coin, index) => (
              <tr key={coin.symbol}>
                <th>{index + 1}</th>
                <td>{coin.symbol}</td>
                <td>{coin.name || "—"}</td>
                <td>{coin.source}</td>
                <td>
                  <button
                    className={`btn btn-sm ${
                      isFavorite(coin.symbol)
                        ? "btn-error"
                        : "btn-success"
                    }`}
                    onClick={() => handleFavoriteToggle(coin.symbol)}
                  >
                    {isFavorite(coin.symbol) ? "Remove" : "Add"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCryptoList;

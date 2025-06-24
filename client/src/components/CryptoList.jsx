import React, { useEffect } from "react";
import { useRecoilState, useRecoilCallback } from "recoil";
import { cryptoAtoms } from "../recoil/atoms/cryptoAtoms";
import { fetchCryptos } from "../recoil/callbacks/cryptoCallbacks";
import { Loading } from "./";

const CryptoList = () => {
  const [cryptoState, setCryptoState] = useRecoilState(cryptoAtoms);
  const { data, loading, error } = cryptoState;

  const loadCryptos = useRecoilCallback(({ set }) => () => {
    fetchCryptos({ set }, ["BTC", "ETH", "ETHBTC@binance"]);
  }, []);

  useEffect(() => {
    loadCryptos();
  }, [loadCryptos]);

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {data.map((coin) => (
        <div
          key={coin.symbol}
          className="card w-96 bg-base-100 shadow-sm shadow-red-500/50 border border-red-300"
        >
          <div className="card-body">
            <h2 className="card-title">{coin.symbol}</h2>
            <p>💰 Price: ${parseFloat(coin.last).toFixed(2)}</p>
            <p>📉 Low: ${parseFloat(coin.lowest).toFixed(2)}</p>
            <p>📈 High: ${parseFloat(coin.highest).toFixed(2)}</p>
            <p>
              📊 Change: {parseFloat(coin.daily_change_percentage).toFixed(2)}%
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Details</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CryptoList;

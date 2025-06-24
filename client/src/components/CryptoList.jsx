// components/CryptoList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptos } from "../store/cryptoSlice";
import { Loading } from "./";

const CryptoList = () => {
	const dispatch = useDispatch();
	const { data, loading, error } = useSelector((state) => state.crypto);

	useEffect(() => {
		dispatch(fetchCryptos({ symbols: "BTC+ETH+ETHBTC@binance" }));
	}, [dispatch]);

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
					className="card w-96 bg-base-100 shadow-sm  shadow-red-500/50 border border-red-300">
					<div className="card-body">
						<h2 className="card-title">{coin.symbol}</h2>
						<p>💰 Price: ${parseFloat(coin.last).toFixed(2)}</p>
						<p>📉 Low: ${parseFloat(coin.lowest).toFixed(2)}</p>
						<p>📈 High: ${parseFloat(coin.highest).toFixed(2)}</p>
						<p>
							📊 Change:{" "}
							{parseFloat(coin.daily_change_percentage).toFixed(
								2
							)}
							%
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

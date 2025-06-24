import React, { useEffect } from "react";
import { useRecoilState, useRecoilCallback } from "recoil";
import { cryptoAtoms } from "../recoil/atoms/cryptoAtoms";
import {
	fetchAllCryptos,
	addToFavorites,
	removeFromFavorites,
} from "../recoil/callbacks/cryptoCallbacks";
import { Loading } from "./";

const AllCryptoList = () => {
	const [cryptoState, setcryptoAtoms] = useRecoilState(cryptoAtoms);
	const { allCryptos, favorites, loading, error } = cryptoState;

	// Fetch all cryptos on mount
	const loadCryptos = useRecoilCallback(
		({ set }) =>
			() => {
				fetchAllCryptos({ set });
			},
		[]
	);

	useEffect(() => {
		loadCryptos();
	}, [loadCryptos]);

	const isFavorite = (symbol) => favorites.includes(symbol);

	const handleFavoriteToggle = useRecoilCallback(
		({ set, snapshot }) =>
			async (symbol) => {
				const { favorites } = await snapshot.getPromise(cryptoAtoms);
				if (favorites.includes(symbol)) {
					removeFromFavorites({ set, snapshot }, symbol);
				} else {
					addToFavorites({ set, snapshot }, symbol);
				}
			},
		[]
	);

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
						{!Array.isArray(allCryptos) ||
						allCryptos.length === 0 ? (
							<div className="text-center text-gray-500 mt-4">
								No cryptocurrencies found.
							</div>
						) : (
							allCryptos.slice(0, 30).map((coin, index) => (
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
											onClick={() =>
												handleFavoriteToggle(
													coin.symbol
												)
											}>
											{isFavorite(coin.symbol)
												? "Remove"
												: "Add"}
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllCryptoList;

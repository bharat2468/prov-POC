import { configureStore } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import uiReducer from "./uiSlice";
// import cryptoReducer from "./cryptoSlice"; // ✅ Import your crypto slice

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	whitelist: ["ui"], // only persist ui
};

const rootReducer = combineReducers({
	ui: uiReducer,
	// crypto: cryptoReducer, // ✅ Add crypto slice here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
});

export const persistor = persistStore(store);

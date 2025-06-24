import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from "./store/store.js";
import {
	CryptoPage,
	Home,
	AllCryptoPage,
	FavouritesPage,
} from "./pages/index.js";
import { RecoilRoot } from "recoil";
import RecoilizeDebugger from 'recoilize';

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/some",
				element: <CryptoPage />,
			},
			{
				path: "/all",
				element: <AllCryptoPage />,
			},
			{
				path: "/favourites",
				element: <FavouritesPage />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RecoilRoot>
			<RecoilizeDebugger />
			{/* <Provider store={store}> */}
				{/* <PersistGate loading={null} persistor={persistor}> */}
					<RouterProvider router={router} />
				{/* </PersistGate> */}
			{/* </Provider> */}
		</RecoilRoot>
	</React.StrictMode>
);

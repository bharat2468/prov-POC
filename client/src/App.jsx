import { Header, Footer, Loading } from "./components";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

function App() {
	return (
		<div className="wrapper min-h-screen">
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
}

export default App;

import {Header,Footer} from "./components/index.js"
import { Outlet } from "react-router-dom";

export const App = () => {
    return (
        <div className="wrapper min-h-screen">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default App;

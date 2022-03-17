import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/home";
import GlobalStates from "stores/global-data";
import "styles/main.css";

const App = () => {
    return (
        <GlobalStates>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </GlobalStates>
    );
};

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/home";
import NavigationBar from "components/layout/navigation";
import "styles/main.css";

const App = () => {
    return (
        <BrowserRouter>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

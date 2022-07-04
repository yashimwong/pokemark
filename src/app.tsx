import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/home";
import NavigationBar from "components/layout/navigation";
import "styles/main.css";
import Roster from "pages/roster";
import Settings from "pages/settings";
import { GameProvider } from "game/context";

const App = () => {
    return (
        <GameProvider>
            <BrowserRouter>
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/roster" element={<Roster />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </BrowserRouter>
        </GameProvider>
    );
};

export default App;

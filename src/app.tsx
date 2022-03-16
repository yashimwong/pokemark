import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SideBar } from "components/navigation";
import { MainContainer } from "components/containers";
import Home from "pages/home";
import GlobalStates from "stores/global";
import "styles/main.css";

const App = () => {
    return (
        <GlobalStates>
            <SideBar />
            <MainContainer>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </MainContainer>
        </GlobalStates>
    );
};

export default App;

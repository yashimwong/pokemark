import { SideBar } from "components/navigation";
import { MainContainer } from "components/containers";
import Home from "pages/home";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "styles/main.css";

const App = () => {
  return (
    <React.Fragment>
      <SideBar />
      <MainContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </MainContainer>
    </React.Fragment>
  );
};

export default App;

import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Nav from "./Components/Nav/Nav";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Search from "./Pages/Search/Search";
import Login from "./Pages/Login/Login";

const Main: React.FC = () => {
  const location = useLocation();

  const isRootPath = location.pathname === '/';

  return (
    <div>
      {!isRootPath && <Nav />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
};

export default App;

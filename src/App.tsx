import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Nav from "./Components/Nav/Nav";
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Search from './Pages/Search/Search';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
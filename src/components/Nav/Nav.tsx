import React, { useState, useRef, useEffect } from "react";
import "./Nav.css";
import Logo from "../../Assets/Img/Fobj.png";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../logoutButton";
import User from "../User";

const Nav: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navRef = useRef(null);
  const navigator = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const handleRedirectHome = () => {
    navigator("/home");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !(navRef.current as any).contains(event.target)) {
        closeMenu();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar" ref={navRef}>
      <img
        src={Logo}
        alt="logo"
        className="logo"
        onClick={handleRedirectHome}
      />
      <div className={`menu ${showMenu ? "active" : ""}`}>
      <User />
        <a href="/About" onClick={closeMenu} className="nav-link">
          Nosotros
        </a>
        <LogoutButton />
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className={`bar ${showMenu ? "open" : ""}`} />
        <div className={`bar ${showMenu ? "open" : ""}`} />
        <div className={`bar ${showMenu ? "open" : ""}`} />
      </div>
    </div>
  );
};

export default Nav;

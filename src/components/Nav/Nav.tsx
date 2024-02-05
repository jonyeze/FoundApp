import React, { useState, useRef, useEffect } from 'react';
import './Nav.css';
import Logo from '../../Assets/Img/Fobj.png';

const Nav: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !(navRef.current as any).contains(event.target)) {
        closeMenu();
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar" ref={navRef}>
       <img src={Logo} alt="logo" className='logo' />
      <div className={`menu ${showMenu ? 'active' : ''}`}>
        <a href="/" onClick={closeMenu} className='nav-link'>Home</a>
        <a href="/About" onClick={closeMenu} className='nav-link'>About</a>
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className={`bar ${showMenu ? 'open' : ''}`} />
        <div className={`bar ${showMenu ? 'open' : ''}`} />
        <div className={`bar ${showMenu ? 'open' : ''}`} />
      </div>
    </div>
  );
};

export default Nav;



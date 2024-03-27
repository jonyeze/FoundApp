import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../firebase/firebaseConfig";
import LogoutButton from "../logoutButton";
import "./index.css";

const User = () => {
  initializeApp(firebaseConfig);
  const [username, setUsername] = useState<string | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || null);
        setPhotoURL(user.photoURL || null);
      } else {
        setUsername(null);
        setPhotoURL(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    setShowDropdown(false);
  };

  return (
    <div className="dropdown-container">
      <div onClick={() => setShowDropdown(!showDropdown)}>
        {username ? (
          <div className="user-info-container">
            {(windowWidth <= 770 || !photoURL) && <span>{username}</span>}
            {(windowWidth <= 770 || photoURL) && (
              <img
                src={photoURL || undefined}
                className="user-img"
                alt="User"
              />
            )}
          </div>
        ) : (
          <span>No has iniciado sesión.</span>
        )}
      </div>
      {showDropdown && (
        <div ref={dropdownRef} className="dropdown-content">
          <LogoutButton />
          <NavLink to="/myObjects" onClick={handleLinkClick}>Mis objetos</NavLink>
        </div>
      )}
    </div>
  );
};

export default User;

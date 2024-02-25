import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../firebase/firebaseConfig";
import "./index.css";

const User = () => {
  initializeApp(firebaseConfig);
  const [username, setUsername] = useState<string | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName) {
          setUsername(user.displayName);
        } else {
          setUsername(null);
        }
        if (user.photoURL) {
          setPhotoURL(user.photoURL);
        } else {
          setPhotoURL(null);
        }
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

  return (
    <div>
      {username ? (
        <div className="user-info-container">
          {(windowWidth <= 770 || !photoURL) && <span>{username}</span>}

          {(windowWidth <= 770 || photoURL) && (
            <img src={photoURL || undefined} className="user-img" alt="User" />
          )}
        </div>
      ) : (
        <span>No has iniciado sesión.</span>
      )}
    </div>
  );
};

export default User;

import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './index.css'

const LogoutButton = () => {

    const navigator = useNavigate();


  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        navigator('/')
    }).catch((error) => {
      console.error("Error al cerrar sesión:", error.message);
    });
  };

  return (
    <span onClick={handleLogout} className="logOut-button">
      Cerrar Sesión
    </span>
  );
};

export default LogoutButton;

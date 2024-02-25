import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleLogo from "../svg/googleLogo";
import './googleButton.css'
import firebaseConfig from "../../firebase/firebaseConfig";

const GoogleLoginButton: React.FC = () => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigator = useNavigate();

  function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        navigator('/home')
        console.log("Inicio de sesión exitoso:", user);
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
      });
  }

  return <button onClick={signInWithGoogle} className="google-button"> <GoogleLogo /> Iniciar sesión con Google</button>;
};

export default GoogleLoginButton;

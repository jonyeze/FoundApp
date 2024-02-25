import React, { useState } from "react";
import "./Login.css";
import DefaultInput from "../../components/DefaultInput/DefaultInput";
import backImage from "../../Assets/Img/Found&Objects.webp";
import logoImage from "../../Assets/Img/Fobj.png";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../firebase/firebaseConfig";
import EmailLogo from "../../components/svg/emailLogo";

const Login: React.FC = () => {
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [showPasswordReset, setPasswordReset] = useState(false);
  const [showRegistrationFields, setShowRegistrationFields] = useState(false);
  const [email, setEmail] = useState("");
  const [sendEmail, setSendEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setHandleConfirmPassword] = useState("");
  const navigator = useNavigate();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleRedirectHome = () => {
    navigator("/home");
  };

  const handleEmailLogin = () => {
    setShowEmailFields(true);
    setShowRegistrationFields(false);
    setPasswordReset(false);
  };

  const handleRegistration = () => {
    setShowRegistrationFields(true);
    setShowEmailFields(false);
  };

  const handleBack = () => {
    setShowEmailFields(false);
    setShowRegistrationFields(false);
    setPasswordReset(false);
  };

  const hanldePasswordReset = () => {
    setPasswordReset(true);
    setShowEmailFields(false);
    setShowRegistrationFields(false);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSendEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSendEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHandleConfirmPassword(event.target.value);
  };

  const handleSignInWithEmailAndPassword = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      handleRedirectHome();
    } catch (error) {
      console.error("Error al iniciar sesión:");
    }
  };

  const handleRegistrationWithEmailAndPassword = async () => {
    try {
      if (password === confirmPassword) {
        await createUserWithEmailAndPassword(auth, email, password);
        handleRedirectHome();
      } else {
        console.error("Las contraseñas no coinciden");
      }
    } catch (error) {
      console.error("Error al registrar usuario:");
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      handleEmailLogin();
      console.log(
        "Se ha enviado un correo electrónico para restablecer la contraseña."
      );
    } catch (error) {
      console.error(
        "Error al enviar el correo electrónico de restablecimiento de contraseña:"
      );
    }
  };

  return (
    <div className="login-container">
      <div>
        <img alt="" src={backImage} />
      </div>
      <div className="login-form">
        <div className="input-container">
          <div>
            <img alt="FoundAD" className="logo" src={logoImage} />
          </div>

          {showEmailFields && (
            <>
              <DefaultInput
                inputValue={email}
                handleChange={handleEmail}
                placeholder={"Email"}
                inputType={"text"}
              />
              <div>
                <DefaultInput
                  inputValue={password}
                  handleChange={handlePassword}
                  placeholder={"Contraseña"}
                  inputType={"password"}
                />
                <span className="forget-password" onClick={hanldePasswordReset}>
                  Te olvidaste la contraseña?
                </span>
              </div>
              <button
                className="button"
                onClick={handleSignInWithEmailAndPassword}
              >
                Iniciar Sesión
              </button>
              <button onClick={handleBack}>Volver atrás</button>
              <span className="register" onClick={handleRegistration}>
                No estás registrado? <b>Registrarse</b>
              </span>
            </>
          )}

          {showPasswordReset && (
            <>
              <div>
                <DefaultInput
                  inputValue={sendEmail}
                  handleChange={handleSendEmail}
                  placeholder={"Email para recuperar su contraseña"}
                  inputType={"text"}
                />
                <div className="button-container">
                  <button onClick={handleResetPassword}>Enviar Email</button>
                </div>
              </div>
              <button onClick={handleBack}>Volver atrás</button>
            </>
          )}

          {showRegistrationFields && (
            <>
              <DefaultInput
                inputValue={email}
                handleChange={handleEmail}
                placeholder={"Email"}
                inputType={"text"}
              />
              <DefaultInput
                inputValue={password}
                handleChange={handlePassword}
                placeholder={"Contraseña"}
                inputType={"password"}
              />
              <DefaultInput
                inputValue={confirmPassword}
                handleChange={handleConfirmPassword}
                placeholder={"Confirmar Contraseña"}
                inputType={"password"}
              />
              <button
                className="button"
                onClick={handleRegistrationWithEmailAndPassword}
              >
                Registrarse
              </button>
              <button onClick={handleBack}>Volver atrás</button>
            </>
          )}

          {!showEmailFields &&
            !showRegistrationFields &&
            !showPasswordReset && (
              <button className="button" onClick={handleEmailLogin}>
                <EmailLogo />
                Iniciar Sesión con email
              </button>
            )}

          {!showEmailFields &&
            !showRegistrationFields &&
            !showPasswordReset && <GoogleLoginButton />}
        </div>
      </div>
    </div>
  );
};

export default Login;

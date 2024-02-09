import React, { useState } from "react";
import "./Login.css";
import DefaultInput from "../../Components/DefaultInput/DefaultInput";
import backImage from "../../Assets/Img/Found&Objects.png";
import logoImage from "../../Assets/Img/Fobj.png";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigator = useNavigate();


  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
    
  const handleRedirectHome = () => {
    navigator("/home");
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className="login-container">
      <div>
        <img alt="" src={backImage} />
      </div>
      <div className="login-form">
        <div className="input-container">
          <div>
            <img alt="" className="logo" src={logoImage} />
          </div>
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

            <span className="forget-password">Te olvidaste la contraseña?</span>
          </div>

          <button className="button" onClick={handleRedirectHome}>Iniciar Sesion</button>
          <span className="register">
            No estas registrado? <b>Registrarse</b>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;

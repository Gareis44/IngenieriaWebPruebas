import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Login.css";
// import { GoogleLogin } from '@react-oauth/google';  // 👈 comentado
import { loginUser } from "../api/authApi"; 

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user && password) {
      loginUser({ username: user, password })
        .then((response) => {
          console.log("Login successful:", response.data);
          navigate("/home");
        })
        .catch((error) => {
          console.error("Error during login:", error.response?.data || error);
          alert("Credenciales inválidas");
        });
    }
  };

  // 👇 podés comentar también estas funciones si querés
  // const handleGoogleLoginSuccess = (credentialResponse) => {
  //   console.log("Google token:", credentialResponse.credential);
  // };

  // const handleGoogleLoginError = () => {
  //   console.log("Login Failed");
  // };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Correo Electrónico"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="button-container">
          <button type="submit" className="login-btn">Ingresar</button>
          <button 
            type="button" 
            className="secondary-btn"
            onClick={() => navigate("/register")}
          >
            Registrarse
          </button>
        </div>
      </form>

      {/* <div className="divider">o</div>
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={handleGoogleLoginError}
      /> */}
    </div>
  );
}

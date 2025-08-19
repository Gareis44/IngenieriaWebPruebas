import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Login.css";
// import { GoogleLogin } from "@react-oauth/google";  
import { registerUser } from "../api/authApi"; 

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password1 || !password2) {
      alert("Por favor completa todos los campos");
      return;
    }
    if (password1 !== password2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Llamamos al backend
    registerUser({ username: email, password1, password2 })
      .then((response) => {
        console.log("Registro exitoso:", response.data);
        alert("Usuario registrado correctamente");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error en el registro:", error.response?.data || error);
        alert("Error al registrar usuario");
      });
  };

  // const handleGoogleLoginSuccess = (credentialResponse) => {   
  //   console.log("Google token:", credentialResponse.credential);
  // };

  // const handleGoogleLoginError = () => {   
  //   console.log("Login con Google falló");
  // };

  return (
    <div className="login-container">
      <h1>Registrarse</h1>
      <form className="login-form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre Completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />
        <input
          type="password"
          placeholder="Repetir Contraseña"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <div className="button-container">
          <button type="submit" className="login-btn">Registrarse</button>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => navigate("/login")}
          >
            Iniciar Sesión
          </button>
        </div>
      </form>

      {/* <div className="divider">o</div> */}
      {/* 
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={handleGoogleLoginError}
      /> 
      */}
    </div>
  );
}

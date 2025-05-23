import React, { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("usuario");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login({ username, password, rol });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/libros/");
    } else {
      alert("Login fallido");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Usuario:</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Rol:</label>
        <select value={rol} onChange={(e) => setRol(e.target.value)}>
          <option value="usuario">Usuario</option>

          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default Login;

import { useState } from "react";
import styles from "./page.module.css";

export default function Registrar() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("usuario");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, rol }),
    });
    if (res.ok) {
      alert("Usuario registrado, ahora inicia sesión");
    } else {
      alert("Error al registrar usuario");
    }
  };

  return (
    <form onSubmit={handleRegister} className={styles.form}>
      <h2 className={styles.title}>Registrar usuario</h2>
      <input
        className={styles.input}
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        className={styles.input}
        placeholder="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <select
        className={styles.select}
        value={rol}
        onChange={(e) => setRol(e.target.value)}
      >
        <option value="usuario">Usuario</option>
        <option value="moderador">Moderador</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" className={styles.button}>
        Registrar
      </button>
    </form>
  );
}

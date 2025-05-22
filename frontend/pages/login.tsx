import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("usuario");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, rol }),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", rol);
      alert("Login exitoso");
      router.push("/libros");
    } else {
      alert("Credenciales inválidas");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2 className={styles.title}>Login</h2>
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
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

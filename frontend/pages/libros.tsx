import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Libros() {
  const [libros, setLibros] = useState<any[]>([]);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [precio, setPrecio] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const rol =
    typeof window !== "undefined" ? localStorage.getItem("rol") : null;

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
      return;
    }
    fetch("http://localhost:5000/api/libros/")
      .then((res) => res.json())
      .then(setLibros);
  }, []);

  const handleBorrar = async (id: number) => {
    await fetch(`http://localhost:5000/api/libros/${id}`, {
      method: "DELETE",
    });
    setLibros(libros.filter((libro) => libro.id !== id));
  };

  const handleAgregar = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/libros/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, autor, precio: parseFloat(precio) }),
    });
    if (res.ok) {
      const nuevo = await res.json();
      setLibros([...libros, nuevo]);
      setTitulo("");
      setAutor("");
      setPrecio("");
    } else {
      alert("Error al agregar libro");
    }
  };

  const handleEditar = (libro: any) => {
    setEditId(libro.id);
    setTitulo(libro.titulo);
    setAutor(libro.autor);
    setPrecio(libro.precio);
  };

  const handleActualizar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId === null) return;
    const res = await fetch(`http://localhost:5000/api/libros/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ precio: parseFloat(precio) }),
    });
    if (res.ok) {
      setLibros(
        libros.map((libro) =>
          libro.id === editId ? { ...libro, precio: parseFloat(precio) } : libro
        )
      );
      setEditId(null);
      setTitulo("");
      setAutor("");
      setPrecio("");
    } else {
      alert("Error al actualizar libro");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2 className={styles.title}>Lista de Libros</h2>
        {rol === "admin" && (
          <form
            onSubmit={editId ? handleActualizar : handleAgregar}
            style={{ marginBottom: "1rem" }}
          >
            <input
              className={styles.input}
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              disabled={!!editId}
            />
            <input
              className={styles.input}
              placeholder="Autor"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              required
              disabled={!!editId}
            />
            <input
              className={styles.input}
              placeholder="Precio"
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
              min="0"
            />
            <button type="submit" className={styles.button}>
              {editId ? "Actualizar" : "Agregar"}
            </button>
            {editId && (
              <button
                type="button"
                className={styles.button}
                style={{ background: "#bdbdbd", marginLeft: "0.5rem" }}
                onClick={() => {
                  setEditId(null);
                  setTitulo("");
                  setAutor("");
                  setPrecio("");
                }}
              >
                Cancelar
              </button>
            )}
          </form>
        )}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {libros.map((libro) => (
            <li key={libro.id} style={{ marginBottom: "0.5rem" }}>
              <span>
                <b>{libro.titulo}</b> - {libro.autor} - ${libro.precio}
              </span>
              {rol === "admin" && (
                <>
                  <button
                    className={styles.button}
                    style={{
                      marginLeft: "0.5rem",
                      background: "#ffd54f",
                      color: "#333",
                    }}
                    onClick={() => handleEditar(libro)}
                  >
                    Editar
                  </button>
                  <button
                    className={styles.button}
                    style={{ marginLeft: "0.5rem", background: "#e57373" }}
                    onClick={() => handleBorrar(libro.id)}
                  >
                    Borrar
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

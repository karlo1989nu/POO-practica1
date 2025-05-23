import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Libros() {
  const [libros, setLibros] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetch("http://localhost:5000/api/libros/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("No autorizado");
        }
        return res.json();
      })
      .then((data) => setLibros(data))
      .catch((err) => {
        setError("No autorizado o error al cargar libros");
        router.push("/login/");
      });
  }, [router]);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Lista de Libros</h2>
      <ul>
        {libros.map((libro) => (
          <li key={libro.id}>
            {libro.titulo} - {libro.autor} - ${libro.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}

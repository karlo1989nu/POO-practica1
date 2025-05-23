const BASE = "http://127.0.0.1:5000/api";

export const getLibros = () => fetch(`${BASE}/libros`).then((r) => r.json());

export const crearLibro = (data) =>
  fetch(`${BASE}/libros/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const editarLibro = (id, data) =>
  fetch(`${BASE}/libros/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const borrarLibro = (id) =>
  fetch(`${BASE}/libros/${id}`, {
    method: "DELETE",
  });

export const login = (creds) =>
  fetch(`${BASE}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(creds),
  });

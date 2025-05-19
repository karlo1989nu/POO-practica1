import React, { useState, useEffect } from "react";
import { getLibros, borrarLibro } from "../services/api";

const ListarLibros = () => {
  const [libros, setLibros] = useState([]);

  const cargarLibros = () => {
    getLibros().then(setLibros);
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  const handleBorrar = async (id) => {
    await borrarLibro(id);
    cargarLibros();
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Autor</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {libros.map((libro) => (
          <tr key={libro.id}>
            <td>{libro.id}</td>
            <td>{libro.titulo}</td>
            <td>{libro.autor}</td>
            <td>{libro.precio}</td>
            <td>
              <button
                onClick={() => {
                  /* lógica de editar */
                }}
              >
                Editar
              </button>
              <button onClick={() => handleBorrar(libro.id)}>Borrar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListarLibros;

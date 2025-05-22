import React, { useState } from "react";
import { crearLibro } from "../services/api";
import { useNavigate } from "react-router-dom";

const FormularioLibro = () => {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [precio, setPrecio] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await crearLibro({ titulo, autor, precio: parseFloat(precio) });
    if (res.ok) {
      navigate("/libros");
    } else {
      alert("Error al crear libro");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título:</label>
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Autor:</label>
        <input
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          step="0.01"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
          min="0"
        />
      </div>
      <button type="submit">Crear Libro</button>
    </form>
  );
};

export default FormularioLibro;

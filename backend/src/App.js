import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ListarLibros from "./components/ListarLibros";
import FormularioLibro from "./components/FormularioLibro";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/libros" element={<ListarLibros />} />
          <Route path="/nuevo" element={<FormularioLibro />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

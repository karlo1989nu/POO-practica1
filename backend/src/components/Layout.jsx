import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Layout = ({ children }) => (
  <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/libros">
          LibrosApp
        </Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/libros">
            Libros
          </Link>
          <Link className="nav-link" to="/nuevo">
            Nuevo
          </Link>
        </div>
      </div>
    </nav>
    <div className="container">{children}</div>
  </div>
);

export default Layout;

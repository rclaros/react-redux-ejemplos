import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/courses" activeStyle={activeStyle}>
        Courses
      </NavLink>
      {" | "}
      <NavLink to="/professors" activeStyle={activeStyle}>
        Professors
      </NavLink>
      {" | "}
      <NavLink to="/productos" activeStyle={activeStyle}>
        Producto
      </NavLink>
      {" | "}
      <NavLink to="/clientes" activeStyle={activeStyle}>
        Cliente
      </NavLink>
      {" | "}
      <NavLink to="/movimientos" activeStyle={activeStyle}>
        Mis Transacciones
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
    </nav>
  );
};

export default Header;

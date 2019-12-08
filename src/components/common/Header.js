import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav>
      <NavLink to="/login" activeStyle={activeStyle} exact>
        login
          <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/courses" activeStyle={activeStyle}>
        courses
      </NavLink>
      {" | "}
     <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "} 
      <NavLink to="/Mistransciones" activeStyle={activeStyle} exact>
        MisTransaciones
      </NavLink>
      {" | "}
      <NavLink to="/clientes" activeStyle={activeStyle}>
        Cliente
      </NavLink>
      {" | "}
      <NavLink to="/transferencias" activeStyle={activeStyle}>
        Transferencia
          <NavLink to="/movimientos" activeStyle={activeStyle}>
        Mis Transacciones
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
      {" | "}
      <NavLink to="/Depositos" activeStyle={activeStyle}>
        Depositos
      </NavLink>
    </nav>
  );
};

export default Header;

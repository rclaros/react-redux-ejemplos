import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav>
      <NavLink to="/login" activeStyle={activeStyle} exact>
        login
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
      <NavLink to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
    </nav>
  );
};

export default Header;

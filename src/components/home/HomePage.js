import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="jumbotron">
    <h1>UPG-FISI TRANSACCIONES BANCARIAS</h1>
    <p>React, Redux and React Router for ultra-responsive web apps.-SJ</p>
    <Link to="about" className="btn btn-primary btn-lg">
      Learn more
    </Link>
    <h1>WELCOME BANKING</h1>
    <p>REALIZA SUS OPERACIONES</p>
  </div>
);

export default HomePage;

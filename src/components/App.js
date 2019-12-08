import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import CoursesPage from "./courses/CoursesPage";
import ManageCoursePage from "./courses/ManageCoursePage"; // eslint-disable-line import/no-named-as-default
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfessorPage from "./professors/ProfessorsPage";
import ManageProfessorPage from "./professors/ManageProfessorPage";

import ClientePage from "./cliente/ClientePage";
import ManageClientePage from "./cliente/ManageClientePage";

import ProductoPage from "./productos/ProductosPage";
import ManageProductoPage from "./productos/ManageProductoPage";

import TransferPage from "./transferencias/TransferPage";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />

        <Route path="/transferencias" component={TransferPage} />

        
        <Route path="/courses" component={CoursesPage} />
        <Route path="/course/:slug" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} />

        <Route path="/professors" component={ProfessorPage} />
        <Route path="/professor/:slug" component={ManageProfessorPage} />
        <Route path="/professor" component={ManageProfessorPage} />

        <Route path="/clientes" component={ClientePage} />
        <Route path="/cliente/:slug" component={ManageClientePage} />
        <Route path="/cliente" component={ManageClientePage} />

        <Route component={PageNotFound} />

        <Route path="/productos" component={ProductoPage} />
        <Route path="/producto/:slug" component={ManageProductoPage} />
        <Route path="/producto" component={ManageProductoPage} />
        <Route component={PageNotFound} />

        <Route path="/transferencias" component={TransferPage} />

      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;

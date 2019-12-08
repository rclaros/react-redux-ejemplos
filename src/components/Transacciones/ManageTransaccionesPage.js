import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getTransacciones,
  savetransaccion
} from "../../redux/actions/transaccionesActions";
import PropTypes from "prop-types";
import ClienteForm from "./TransaccionesForm";
import { newCliente } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageTransaccionesPage({
  transacciones,
  getTransacciones,
  saveTransacciones,
  history,
  ...props
}) {
  const [Transacciones, setTransacciiones] = useState({ ...props.Transacciones });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (transacciones.length === 0) {
      getTransacciones().catch(error => {
        alert("Loading Transacciones failed" + error);
      });
    } else {
      setTransacciiones({ ...props.Transacciones });
    }
  }, [props.transacciones]);

  function handleChange(event) {
    const { name, value } = event.target;
    setTransacciiones(prevTransacciones => ({
      ...prevTransacciones,[name]: name === "transaccionId" ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const {name } = Transacciones;
    const errors = {};
    if (!name) errors.name = "Transaction date is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveTransacciones(transaccion)
      .then(() => {
        toast.success("Transaccion saved.");
        history.push("/Transacciones");
      })
      .catch(error => {
        console.log("error", error);
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }
  return Transacciones.length === 0 ? (
    <Spinner />
  ) : (
    <ClienteForm
      Transaccion={Transaccion}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageTransaccionesPage.propTypes = {
  Transacciones: PropTypes.array.isRequired,
  getTransacciones: PropTypes.func.isRequired,
  saveTransacciones: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getTransaccionesById(transacciones, slug) {
  return Transacciones.find(Transaccion => Transacciones.id === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const Transaccion = slug && state.Transacciones.data.length > 0 ? getTransaccionesById(state.Transacciones.data, +slug): newtransaccion;
  return {
    transaccion,
    Transacciones: state.Transacciones.data
  };
}

const mapDispatchToProps = {
  getTransacciones,
  saveTransacciones
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageTransaccionesPage);

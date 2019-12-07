import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getClientes,
  saveCliente
} from "../../redux/actions/clienteActions";
import PropTypes from "prop-types";
import ClienteForm from "./ClienteForm";
import { newCliente } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageClientePage({
  clientes,
  getClientes,
  saveCliente,
  history,
  ...props
}) {
  const [cliente, setCliente] = useState({ ...props.cliente });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (clientes.length === 0) {
      getClientes().catch(error => {
        alert("Loading clientes failed" + error);
      });
    } else {
      setCliente({ ...props.cliente });
    }
  }, [props.clientes]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCliente(prevCliente => ({
      ...prevCliente,[name]: name === "clienteId" ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const {name } = cliente;
    const errors = {};
    if (!name) errors.name = "Cliente Name is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCliente(cliente)
      .then(() => {
        toast.success("Cliente saved.");
        history.push("/clientes");
      })
      .catch(error => {
        console.log("error", error);
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }
  return clientes.length === 0 ? (
    <Spinner />
  ) : (
    <ClienteForm
      cliente={cliente}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageClientePage.propTypes = {
  cliente: PropTypes.array.isRequired,
  getClientes: PropTypes.func.isRequired,
  saveCliente: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getClienteById(clientes, slug) {
  return clientes.find(cliente => cliente.id === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const cliente = slug && state.clientes.data.length > 0 ? getClienteById(state.clientes.data, +slug): newCliente;
  return {
    cliente,
    clientes: state.clientes.data
  };
}

const mapDispatchToProps = {
  getClientes,
  saveCliente
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageClientePage);

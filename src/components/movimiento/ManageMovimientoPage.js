import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getMovimientos,
  saveMovimiento
} from "../../redux/actions/movimientoActions";
import PropTypes from "prop-types";
import MovimientoForm from "./MovimientoForm";
import { newMovimiento } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageMovimientoPage({
  movimientos,
  getMovimientos,
  saveMovimiento,
  history,
  ...props
}) {
  const [movimiento, setMovimiento] = useState({ ...props.movimiento });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (movimientos.length === 0) {
      getMovimientos().catch(error => {
        alert("Loading movimientos failed" + error);
      });
    } else {
      setMovimiento({ ...props.movimiento });
    }
  }, [props.movimientos]);

  function handleChange(event) {
    const { name, value } = event.target;
    setMovimiento(prevMovimiento => ({
      ...prevMovimiento,[name]: name === "movimientoId" ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const {name } = movimiento;
    const errors = {};
    if (!name) errors.name = "Movimiento Name is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveMovimiento(movimiento)
      .then(() => {
        toast.success("Movimiento saved.");
        history.push("/movimientos");
      })
      .catch(error => {
        console.log("error", error);
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }
  return movimientos.length === 0 ? (
    <Spinner />
  ) : (
    <MovimientoForm
      movimiento={movimiento}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageMovimientoPage.propTypes = {
  movimiento: PropTypes.array.isRequired,
  getMovimientos: PropTypes.func.isRequired,
  saveMovimiento: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getMovimientoById(movimientos, slug) {
  return movimientos.find(movimiento => movimiento.id === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const movimiento = slug && state.movimientos.data.length > 0 ? getMovimientoById(state.movimientos.data, +slug): newMovimiento;
  return {
    movimiento,
    movimientos: state.movimientos.data
  };
}

const mapDispatchToProps = {
  getMovimientos,
  saveMovimiento
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageMovimientoPage);

import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const MovimientoForm = ({
  movimiento,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{movimiento.id ? "Edit" : "Add"} Movimiento</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}

      <TextInput
        name="fecha"
        label="fecha"
        value={movimiento.name}
        onChange={onChange}
        error={errors.title}
      />

       <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

MovimientoForm.propTypes = {
  movimiento: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default MovimientoForm;
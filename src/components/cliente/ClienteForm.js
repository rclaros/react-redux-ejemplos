import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const ClienteForm = ({
  cliente,
  Cuenta,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{cliente.id ? "Edit" : "Add"} Cliente</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}

      <TextInput
        name="name" /*clientename revisar*/
        label="name"
        value={cliente.name}
        onChange={onChange}
        error={errors.title}
      />
       <TextInput
        name="Cuenta"
        label="Cuenta"
        value={cliente.Cuenta}
        onChange={onChange}
        error={errors.Cuenta}
      />

       <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

ClienteForm.propTypes = {
  cliente: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default ClienteForm;
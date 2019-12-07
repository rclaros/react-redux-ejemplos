import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const ProductoForm = ({
    producto,
    onSave,
    onChange,
    saving = false,
    errors = {}
  }) => {
    return (
      <form onSubmit={onSave}>
        <h2>{producto.id ? "Edit" : "Add"} Producto</h2>
        {errors.onSave && (
          <div className="alert alert-danger" role="alert">
            {errors.onSave}
          </div>
        )}               
  
      <TextInput
        name="name"
        label="name"
       value={producto.name}
        onChange={onChange}
        error={errors.title}
      />
        <button type="submit" disabled={saving} className="btn btn-primary">
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    );
  };

  ProductoForm.propTypes = {
    producto: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
  };
  
  export default ProductoForm;
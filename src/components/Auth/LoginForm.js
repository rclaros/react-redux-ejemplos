import React from "react";

import TextInput from "../common/TextInput";
const LoginFrom = (
   usuario,
  contraseña,
  onSave,
  onChange,
  saving = false,
  errors = {},
) => (
    <form onSubmit={onSave}>
      <h2> LOGIN</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="usuario" 
        label="usuario"
        value={usuario.name}
        onChange={onChange}
        error={errors.title}
      />
    
        <TextInput
        name="contraseña" 
        label="contraseña"
        value={contraseña.name}
        onChange={onChange}
        error={errors.title}
      />

       <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Login"}
      </button>
          <n> </n>
      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Register"}
      </button>
    </form>

);

export default LoginFrom;

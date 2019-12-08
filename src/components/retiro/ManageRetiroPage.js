import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getRetiros,
  saveRetiro
} from "../../redux/actions/retiroActions";
import PropTypes from "prop-types";
import RetiroForm from "./RetiroForm";
import { newRetiro } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageRetiroPage({
  retiros,
  getRetiros,
  saveRetiro,
  history,
  ...props
}) {
  const [retiro, setRetiro] = useState({ ...props.retiro });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (retiros.length === 0) {
      getRetiros().catch(error => {
        alert("Loading retiros failed" + error);
      });
    } else {
      setRetiro({ ...props.retiro });
    }
  }, [props.retiros]);

  function handleChange(event) {
    const { name, value } = event.target;
    setRetiro(prevRetiro => ({
      ...prevRetiro,[name]: name === "retiroId" ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const {name } = retiro;
    const errors = {};
    if (!name) errors.name = "Retiro is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveRetiro(retiro)
      .then(() => {
        toast.success("Retiro saved.");
        history.push("/retiros");
      })
      .catch(error => {
        console.log("error", error);
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }
  return retiros.length === 0 ? (
    <Spinner />
  ) : (
    <RetiroForm
      retiro={retiro}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageRetiroPage.propTypes = {
  retiro: PropTypes.array.isRequired,
  getRetiros: PropTypes.func.isRequired,
  saveRetiro: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getRetiroById(retiros, slug) {
  return retiros.find(retiro => retiro.id === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const retiro = slug && state.retiros.data.length > 0 ? getRetiroById(state.retiros.data, +slug): newRetiro;
  return {
    retiro,
    retiros: state.retiros.data
  };
}

const mapDispatchToProps = {
  getRetiros,
  saveRetiro
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageRetiroPage);
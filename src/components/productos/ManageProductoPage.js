import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getProductos,
  saveProducto
} from "../../redux/actions/productoActions";
import PropTypes from "prop-types";
import ProductoForm from "./ProductoForm";
import { newProducto } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageProductoPage({
    productos,
    getProductos,
    saveProducto,
    history,
    ...props
  }) {
    const [producto, setProducto] = useState({ ...props.producto });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (productos.length === 0) {
          getProductos().catch(error => {
            alert("Loading producto failed" + error);
          });
        } else {
          setProducto({ ...props.producto });
        }
      }, [props.productos]);

      function handleChange(event) {
        const { name, value } = event.target;
        setProducto(prevProducto => ({
          ...prevProducto,[name]: name === "productoId" ? parseInt(value, 10) : value
        }));
      }
    
      function formIsValid() {
        const {name } = producto;
        const errors = {};
        if (!name) errors.name = "Producto Name is required.";
    
        setErrors(errors);
        // Form is valid if the errors object still has no properties
        return Object.keys(errors).length === 0;
      }

      function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        saveProducto(producto)
          .then(() => {
            toast.success("Producto saved.");
            history.push("/productos");
          })
          .catch(error => {
            console.log("error", error);
            setSaving(false);
            setErrors({ onSave: error.message });
          });
      }
      return productos.length === 0 ? (
        <Spinner />
      ) : (
        <ProductoForm
          producto={producto}
          errors={errors}
          onChange={handleChange}
          onSave={handleSave}
          saving={saving}
        />
      );
    }

    ManageProductoPage.propTypes = {
        productos: PropTypes.array.isRequired,
        getProductos: PropTypes.func.isRequired,
        saveProducto: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired
      };

      export function getProductoById(productos, slug) {
        return productos.find(producto => producto.id === slug) || null;
      }

      function mapStateToProps(state, ownProps) {
        const slug = ownProps.match.params.slug;
        const producto = slug && state.productos.data.length > 0 ? getProductoById(state.productos.data, +slug): newProducto;
        return {
          producto,
          productos: state.productos.data
        };
      }
      
      const mapDispatchToProps = {
        getProductos,
        saveProducto
      };

      export default connect(
        mapStateToProps,
        mapDispatchToProps
      )(ManageProductoPage);
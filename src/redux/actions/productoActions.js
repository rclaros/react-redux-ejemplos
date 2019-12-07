import * as types from "./actionTypes";
import * as productoApi from "../../api/productoApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function getProductoSuccess(productos) {
    return { type: types.LOAD_PRODUCTOS_SUCCESS, productos };
  }
  export function getProductoDataSuccess(productos) {
    return { type: types.LOAD_PRODUCTOS_SUCCESS,productos:{data:productos.data,total:productos.total }}; 
  }
  export function createProductoSuccess(producto) {
    return { type: types.CREATE_PRODUCTO_SUCCESS, producto };
  }

  export function updateProductoSuccess(producto) {
    return { type: types.UPDATE_PRODUCTO_SUCCESS, producto };
  }
  
  export function deleteProductoOptimistic(producto) {
    return { type: types.DELETE_PRODUCTO_OPTIMISTIC, producto };
  }

  export function getProductos() {
    return function (dispatch) {
      dispatch(beginApiCall());
      return productoApi
        .getProductos()
        .then(productos => {
          dispatch(getProductoSuccess(productos));
        })
        .catch(error => {
          dispatch(apiCallError(error));
          throw error;
        });
    };
  }

  export function getProductosData(page=1,_sort,_order) {
    return function (dispatch) {
      dispatch(beginApiCall()); 
      return productoApi
        .getProductosData(page,_sort,_order)
        .then(productos => {
          dispatch(getProductoDataSuccess(productos)); 
        })
        .catch(error => {
          dispatch(apiCallError(error));
          throw error;
        });
    };
  }

  export function saveProducto(producto) {
    //eslint-disable-next-line no-unused-vars
    return function (dispatch, getState) {
      dispatch(beginApiCall());
      return productoApi
        .saveProducto(producto)
        .then(savedProducto => {
          producto.id
            ? dispatch(updateProductoSuccess(savedProducto))
            : dispatch(createProductoSuccess(savedProducto));
        })
        .catch(error => {
          dispatch(apiCallError(error));
          throw error;
        });
    };
  }

  export function deleteProducto(producto) {
    return function (dispatch) {
      // Doing optimistic delete, so not dispatching begin/end api call
      // actions, or apiCallError action since we're not showing the loading status for this.
      dispatch(deleteProductoOptimistic(producto));
      return productoApi.deleteProducto(producto.id);
    };
  }
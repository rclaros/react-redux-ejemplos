import * as types from "./actionTypes";
import * as TransaccionApi from "../../api/TransaccionApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function getTransaccionesSuccess(transacciones) {
  return { type: types.LOAD_TRANSACCIONES_SUCCESS, transacciones };
}
export function getClienteDataSuccess(transacciones) {
  return { type: types.LOAD_TRANSACCIONES_SUCCESS,transacciones:{data:transacciones.data,total:transacciones.total }}; 
}
export function createtransaccionSuccess(transaccion) {
  return { type: types.CREATE_TRANSACCIONNES_SUCCESS, cliente };
}

export function updatetransaccionSuccess(transaccion) {
  return { type: types.UPDATE_TRANSACCIONNES_SUCCESS, cliente };
}

export function deleteClienteOptimistic(transaccion) {
  return { type: types.DELETE_TRANSACCIONNES_OPTIMISTIC, cliente };
}

export function getTransacciones() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return TransaccionesApi
      .getTransacciones()
      .then(transacciones => {
        dispatch(getTrasaccionesSuccess(transacciones));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function getTransaccionesData(page=1,_sort,_order) {
  return function (dispatch) {
    dispatch(beginApiCall()); 
    return TransaccionesApi
      .getTransaccionesData(page,_sort,_order)
      .then(clientes => {
        dispatch(getTransaccionesDataSuccess(transacciones)); 
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveTransacciones(transacciones) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return TransaccionesApi
      .saveTransacciones(transacciones)
      .then(savedTransacciones => {
        Transacciones.id
          ? dispatch(updateClienteSuccess(savedTransacciones))
          : dispatch(createClienteSuccess(savedTransacciones));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteTransacciones(Transacciones) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteTransaccionesOptimistic(Transacciones));
    return TransaccionesApi.deleteTransacciones(transacciones.id);
  };
}
  

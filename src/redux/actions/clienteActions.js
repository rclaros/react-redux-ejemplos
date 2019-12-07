import * as types from "./actionTypes";
import * as clienteApi from "../../api/clienteApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function getClienteSuccess(clientes) {
  return { type: types.LOAD_CLIENTES_SUCCESS, clientes };
}
export function getClienteDataSuccess(clientes) {
  return { type: types.LOAD_CLIENTES_SUCCESS,clientes:{data:clientes.data,total:clientes.total }}; 
}
export function createClienteSuccess(cliente) {
  return { type: types.CREATE_CLIENTE_SUCCESS, cliente };
}

export function updateClienteSuccess(cliente) {
  return { type: types.UPDATE_CLIENTE_SUCCESS, cliente };
}

export function deleteClienteOptimistic(cliente) {
  return { type: types.DELETE_CLIENTE_OPTIMISTIC, cliente };
}

export function getClientes() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return clienteApi
      .getClientes()
      .then(clientes => {
        dispatch(getClienteSuccess(clientes));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function getClientesData(page=1,_sort,_order) {
  return function (dispatch) {
    dispatch(beginApiCall()); 
    return clienteApi
      .getClientesData(page,_sort,_order)
      .then(clientes => {
        dispatch(getClienteDataSuccess(clientes)); 
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveCliente(cliente) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return clienteApi
      .saveCliente(cliente)
      .then(savedCliente => {
        cliente.id
          ? dispatch(updateClienteSuccess(savedCliente))
          : dispatch(createClienteSuccess(savedCliente));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteCliente(cliente) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteClienteOptimistic(cliente));
    return clienteApi.deleteCliente(cliente.id);
  };
}
  

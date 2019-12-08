import * as types from "./actionTypes";
import * as movimientoApi from "../../api/movimientoApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function getMovimientoSuccess(movimientos) {
  return { type: types.LOAD_MOVIMIENTOS_SUCCESS, movimientos };
}
export function getMovimientoDataSuccess(movimientos) {
  return { type: types.LOAD_MOVIMIENTOS_SUCCESS,movimientos:{data:movimientos.data,total:movimientos.total }}; 
}
export function createMovimientoSuccess(movimiento) {
  return { type: types.CREATE_MOVIMIENTO_SUCCESS, movimiento };
}

export function updateMovimientoSuccess(movimiento) {
  return { type: types.UPDATE_MOVIMIENTO_SUCCESS, movimiento };
}

export function deleteMovimientoOptimistic(movimiento) {
  return { type: types.DELETE_MOVIMIENTO_OPTIMISTIC, movimiento };
}

export function getMovimientos() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return movimientoApi
      .getMovimientos()
      .then(movimientos => {
        dispatch(getMovimientoSuccess(movimientos));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function getMovimientosData(page=1,_sort,_order) {
  return function (dispatch) {
    dispatch(beginApiCall()); 
    return movimientoApi
      .getMovimientosData(page,_sort,_order)
      .then(movimientos => {
        dispatch(getMovimientoDataSuccess(movimientos)); 
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveMovimiento(movimiento) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return movimientoApi
      .saveMovimiento(movimiento)
      .then(savedMovimiento => {
        movimiento.id
          ? dispatch(updateMovimientoSuccess(savedMovimiento))
          : dispatch(createMovimientoSuccess(savedMovimiento));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteMovimiento(movimiento) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteMovimientoOptimistic(movimiento));
    return movimientoApi.deleteMovimiento(movimiento.id);
  };
}
  

import * as types from "./actionTypes";
import * as professorApi from "../../api/professorApi";
import * as clienteApi from "../../api/clienteApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function getProfessorsData(professors) {
  return { type: types.LOAD_LIST,list:{professors:professors}}; 
}

export function getClientesData(clientes) {
  return { type: types.LOAD_LIST,list:{professors:clientes}}; 
}

export function getListProfessors() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return professorApi
      .getProfessors()
      .then(professors => {
        dispatch(getProfessorsData(professors));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function getProfessors() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return professorApi
      .getProfessors()
      .then(professors => {
        dispatch(getProfessorsData(professors));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function getClientes() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return clienteApi
      .getClientes()
      .then(clientes => {
        dispatch(getClientesData(clientes));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}


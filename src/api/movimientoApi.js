import { handleResponse, handleError, handleResponseList  } from "./apiUtils";
const baseUrl = process.env.API_URL + "/movimientos/";

export function getMovimientos() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function getMovimientosData(page,_sort,_order) {
  let string_order="";
  if(_sort && _order){
    string_order="&_sort="+_sort+"&_order="+_order
  }
  return fetch(baseUrl + "?_page="+page+"&_limit=3"+string_order)
  .then(handleResponseList)
  .catch(handleError);
}

export function saveMovimiento(movimiento) {
  return fetch(baseUrl + (movimiento.id || ""), {
    method: movimiento.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(movimiento)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteMovimiento(movimientoId) {
  return fetch(baseUrl + movimientoId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}

import { handleResponse, handleError, handleResponseList  } from "./apiUtils";
const baseUrl = process.env.API_URL + "/retiros/";

export function getRetiros() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function getRetirosData(page,_sort,_order) {
  let string_order="";
  if(_sort && _order){
    string_order="&_sort="+_sort+"&_order="+_order
  }
  return fetch(baseUrl + "?_page="+page+"&_limit=3"+string_order)
  .then(handleResponseList)
  .catch(handleError);
}

export function saveRetiro(retiro) {
  return fetch(baseUrl + (retiro.id || ""), {
    method: retiro.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(retiro)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteRetiro(retiroId) {
  return fetch(baseUrl + retiroId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}

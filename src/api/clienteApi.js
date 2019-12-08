import { handleResponse, handleError, handleResponseList,handleResponseRemote  } from "./apiUtils";
const baseUrl = process.env.API_URL + "/clientes/";
const baseUrlRemote ="http://localhost:8080/customers?page=0&size=10";
const baseUrl_Cuenta = process.env.API_URL + "/Cuentas/";

export function getClientes() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function getClientesData(page,_sort,_order) {
  let string_order="";
  if(_sort && _order){
    string_order="&_sort="+_sort+"&_order="+_order
  }
  return fetch(baseUrl + "?_page="+page+"&_limit=3"+string_order)
  .then(handleResponseList)
  .catch(handleError);
}
export function getClientesDatax(page,_sort,_order) {
  return fetch(baseUrlRemote,{
    crossDomain:true,
    headers: {'Content-Type':'application/json'}
  })
  .then(handleResponseRemote)
  .catch(handleError);
}

export function saveCliente(cliente) {
  return fetch(baseUrl + (cliente.id || ""), {
    method: cliente.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(cliente)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCliente(clienteId) {
  return fetch(baseUrl + clienteId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}

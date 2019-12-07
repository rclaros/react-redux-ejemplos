import { handleResponse, handleError, handleResponseList  } from "./apiUtils";
const baseUrl = process.env.API_URL + "/productos/";

export function getProductos() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function getProductosData(page,_sort,_order) {
  let string_order="";
  if(_sort && _order){
    string_order="&_sort="+_sort+"&_order="+_order
  }
  return fetch(baseUrl + "?_page="+page+"&_limit=3"+string_order)
  .then(handleResponseList)
  .catch(handleError);
}
export function saveProducto(producto) {
  return fetch(baseUrl + (producto.id || ""), {
    method: producto.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(producto)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteProducto(productoId) {
  return fetch(baseUrl + productoId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
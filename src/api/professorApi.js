import { handleResponse, handleError, handleResponseList  } from "./apiUtils";
const baseUrl = process.env.API_URL + "/professors/";

export function getProfessors() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function getProfessorsData(page,_sort,_order) {
  let string_order="";
  if(_sort && _order){
    string_order="&_sort="+_sort+"&_order="+_order
  }
  return fetch(baseUrl + "?_page="+page+"&_limit=3"+string_order)
  .then(handleResponseList)
  .catch(handleError);
}
export function saveProfessor(professor) {
  return fetch(baseUrl + (professor.id || ""), {
    method: professor.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(professor)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteProfessor(professorId) {
  return fetch(baseUrl + professorId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}

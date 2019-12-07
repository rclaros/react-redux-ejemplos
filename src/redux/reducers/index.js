import { combineReducers } from "redux";
import courses from "./courseReducer";
import professors from "./professorReducer";
import clientes from "./clienteReducer";
import list from "./listReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  courses,
  professors,
  clientes,
  list,
  apiCallsInProgress
});

export default rootReducer;

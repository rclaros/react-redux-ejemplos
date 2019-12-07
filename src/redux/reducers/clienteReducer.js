import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function clienteReducer(state = initialState.clientes, action) {
  
  switch (action.type) {
    case types.CREATE_CLIENTE_SUCCESS:
      return {
        ...state, data:[...state.data, action.cliente ],
        total:state.total + 1};

    case types.UPDATE_CLIENTE_SUCCESS:
      return state.map(cliente =>
        cliente.id === action.cliente.id ? action.cliente : cliente );

    case types.LOAD_CLIENTES_SUCCESS:
      return action.clientes;
    
    case types.DELETE_CLIENTE_OPTIMISTIC:
      return { 
        ...state,
        data: state.data.filter(cliente => cliente.id !== action.cliente.id),
      total: state.total - 1
      };
    default:
      return state;
  }
}

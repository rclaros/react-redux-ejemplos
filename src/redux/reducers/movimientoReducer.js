import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function movimientoReducer(state = initialState.movimientos, action) {
  
  switch (action.type) {
    case types.CREATE_MOVIMIENTO_SUCCESS:
      return {
        ...state, data:[...state.data, action.movimiento ],
        total:state.total + 1};

    case types.UPDATE_MOVIMIENTO_SUCCESS:
      return state.map(movimiento =>
        movimiento.id === action.movimiento.id ? action.movimiento : movimiento );

    case types.LOAD_MOVIMIENTOS_SUCCESS:
      return action.movimientos;
    
    case types.DELETE_MOVIMIENTO_OPTIMISTIC:
      return { 
        ...state,
        data: state.data.filter(movimiento => movimiento.id !== action.movimiento.id),
      total: state.total - 1
      };
    default:
      return state;
  }
}

import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function productoReducer(state = initialState.productos, action) {
  switch (action.type) {
    case types.CREATE_PRODUCTO_SUCCESS:
      return {
        ...state, data:[...state.data, action.producto ],
        total:state.total + 1};

    case types.UPDATE_PRODUCTO_SUCCESS:
      return state.map(producto =>
        producto.id === action.producto.id ? action.producto : producto );

    case types.LOAD_PRODUCTOS_SUCCESS:
      return action.productos;
    
    case types.DELETE_PRODUCTO_OPTIMISTIC:
      return { 
        ...state,
        data: state.data.filter(producto => producto.id !== action.producto.id),
      total: state.total - 1
      };
    default:
      return state;
  }
}
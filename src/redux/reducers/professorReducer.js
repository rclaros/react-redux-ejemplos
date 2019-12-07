import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function professorReducer(state = initialState.professors, action) {
  
  switch (action.type) {
    case types.CREATE_PROFESSOR_SUCCESS:
      return {
        ...state, data:[...state.data, action.professor ],
        total:state.total + 1};

    case types.UPDATE_PROFESSOR_SUCCESS:
      return state.map(professor =>
        professor.id === action.professor.id ? action.professor : professor );

    case types.LOAD_PROFESSORS_SUCCESS:
      return action.professors;
    
    case types.DELETE_PROFESSOR_OPTIMISTIC:
      return { 
        ...state,
        data: state.data.filter(professor => professor.id !== action.professor.id),
      total: state.total - 1
      };
    default:
      return state;
  }
}

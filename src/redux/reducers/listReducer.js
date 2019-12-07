import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function professorReducer(state = initialState.list, action) {
  switch (action.type) {
    case types.LOAD_LIST:
      return action.list;
    default:
      return state;
  }
}

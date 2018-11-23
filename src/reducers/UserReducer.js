import { ADD_USER, DELETE_USER, FETCH_USER } from 'constants/ActionTypes';

export default function UserReducer(state = [], action) {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload];
    case DELETE_USER:
      return state.filter(user => user._id !== action.payload.id);
    case FETCH_USER:
      return action.users;
    default:
      return state;
  }
}
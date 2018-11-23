import { ADD_PRODUCT, DELETE_PRODUCT, FETCH_PRODUCT } from 'constants/ActionTypes';

export default function ProductReducer(state = [], action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...state, action.payload];
    case DELETE_PRODUCT:
      return state.filter(product => product._id !== action.payload.id);
    case FETCH_PRODUCT:
      return action.products;
    default:
      return state;
  }
}
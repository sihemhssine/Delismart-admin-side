import { ADD_CATEGORY, FILTER_CATEGORY, DELETE_CATEGORY, FETCH_CATEGORY } from 'constants/ActionTypes';

export default function  CategoryReducer(state = [], action) {
  switch (action.type) {
    case ADD_CATEGORY:
      return [...state, action.payload];
    case DELETE_CATEGORY:
      return state.filter(category => category._id !== action.payload.id);
      case FETCH_CATEGORY:
      return action.categories;
      case FILTER_CATEGORY: 
      return state.filter(category => category.name === action.payload.name);
    default:
      return state;
  }
}
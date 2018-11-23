import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import Settings from './Settings'; 
import Auth from './Auth';
import Users from './UserReducer';
import Products from './ProductReducer';
import Categories from './CategoryReducer';


const reducers = combineReducers({
    routing: routerReducer,
    settings: Settings, 
    auth: Auth, 
    users : Users, 
    products: Products, 
    categories: Categories

});

export default reducers;

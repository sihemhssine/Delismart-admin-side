import {applyMiddleware, createStore} from "redux";
import reducers from "../reducers/index";
import createHistory from "history/createHashHistory";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/index";
import thunk from 'redux-thunk';
import { fetchAllUsers } from '../actions/User';
import { fetchAllProducts } from '../actions/Product';
import { fetchAllCategories } from '../actions/Category';
import { composeWithDevTools } from 'redux-devtools-extension';
 

const history = createHistory(); 
const sagaMiddleware = createSagaMiddleware();
export default function configureStore(initialState) {

 const store = createStore(reducers, initialState,
        composeWithDevTools(
            applyMiddleware(
              sagaMiddleware,
              thunk)  ) ) ;
       
   store.dispatch(fetchAllUsers() ); 
   store.dispatch(fetchAllCategories() ); 
   store.dispatch(fetchAllProducts() ); 

   sagaMiddleware.run(rootSaga);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/index', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}
export {history};

import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import RootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const middlewares = [ReduxThunk];
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(RootReducer, enhancer);

export default store;

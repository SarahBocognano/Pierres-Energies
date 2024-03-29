import { applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import combineReducers from './reducers';

const initialState = {};

const middleWare = [thunk];

const composeEnhancers = indow.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__() || compose;
const store = configureStore (combineReducers, composeEnhancers(
    applyMiddleware(...middleWare),
));

export default store;
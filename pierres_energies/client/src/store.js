import { applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import combineReducers from './reducers';

const initialState = {};

const middleWare = [thunk];

const store = configureStore (combineReducers, initialState, compose(
    applyMiddleware(...middleWare),
    //window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;
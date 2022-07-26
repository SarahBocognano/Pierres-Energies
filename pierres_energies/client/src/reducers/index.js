import { combineReducers } from 'redux';
import itemReducer from 'reducers';
import authReducer from 'reducers';
import errorReducer from 'reducers';
import cartReducer from 'reducers';
import orderReducer from 'reducers';

export default combineReducers({
  item: itemReducer,
  auth: authReducer,
  error: errorReducer,
  cart: cartReducer,
  order: orderReducer
})
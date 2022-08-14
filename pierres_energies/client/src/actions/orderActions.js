import axios from 'axios';
import { returnErrors } from './errorActions';
import { GET_ORDERS, CHECKOUT, ORDERS_LOADING } from './types';

export const getOrders = (id) => dispatch => {
  dispatch(ordersLoading());
  axios.get(`/api/orders/${id}`)
  .then(res => dispatch({
    type: GET_ORDERS,
    payload: res.data
  }))
  .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const checkout = (id, source) => dispatch => {
  axios.post(`/api/orders/${id}`, {source})
  .then(res => dispatch ({
    type: CHECKOUT,
    payload: res.data
  }))
  .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const ordersLoading = () => {
  return {
    type: ORDERS_LOADING,
  }
}
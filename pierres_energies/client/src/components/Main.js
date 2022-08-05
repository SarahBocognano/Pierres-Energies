import { Component } from 'react';
import AddItem from './AddItem';
import Home from './Home';
import { Route, Navigate, Routes, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Cart from './Cart';
import Orders from './Orders';

class Main extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/home'>
              <Home />
            </Route>
            <Route path='/addItem'>
              <AddItem />
            </Route>
            <Route path='/cart'>
              <Cart />
            </Route>
            <Route path='/orders'>
              <Orders />
            </Route>
            <Route path='/' element={<Navigate replace to='/home' />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default withRouter(connect()(Main));
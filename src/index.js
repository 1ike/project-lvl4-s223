import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Cookies from 'js-cookie';
import faker from 'faker';

import gon from 'gon';
// import io from 'socket.io-client';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

import MainContainer from './components/Main';
// import reducers from './reducers';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}


const username = Cookies.get('username');
const userName = username || faker.name.findName();
if (!username) Cookies.set('username', userName);

const user = { name: userName };
const initialState = { ...gon, user };

console.log(initialState);

const store = createStore(
  state => state,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
);

render(
  <Provider store={store}>
    <MainContainer />
  </Provider>,
  document.getElementById('main'),
);

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookies from 'js-cookie';
import faker from 'faker';

import gon from 'gon';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

import socket from './socket';
import MainContainer from './components/Main';
import reducers from './reducers';
import { receiveMessage } from './actions';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}


const username = Cookies.get('username');
const userName = username || faker.name.findName();
if (!username) Cookies.set('username', userName);

const user = { name: userName };
const initialState = { ...gon, currentUser: user };

socket.on('newMessage', msg => console.log(msg));


// console.log(initialState);

const middlewares = [
  applyMiddleware(thunk),
];
if (window.__REDUX_DEVTOOLS_EXTENSION__) { // eslint-disable-line
  middlewares.push(window.__REDUX_DEVTOOLS_EXTENSION__()); // eslint-disable-line
}

const store = createStore(
  reducers,
  initialState,
  compose(...middlewares),
);

store.dispatch(receiveMessage());

render(
  <Provider store={store}>
    <MainContainer />
  </Provider>,
  document.getElementById('main'),
);

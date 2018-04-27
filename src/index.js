import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

import Context, { defaultContextValue } from './Context';
import store from './store';
import MainContainer from './components/Main';
import { receiveMessage } from './actions';

// import socket from './socket';
// socket.on('newMessage', msg => console.log(msg));

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}


store.dispatch(receiveMessage());

render(
  <Provider store={store}>
    <Context.Provider value={defaultContextValue}>
      <MainContainer />
    </Context.Provider>
  </Provider>,
  document.getElementById('main'),
);

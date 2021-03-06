import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import '../assets/images/pencil.svg';
import '../assets/images/x.svg';


import Context, { defaultContextValue } from './Context';
import store from './store';
import MainContainer from './components/Main';
import { subscribeOnMessage, subscribeOnChannels } from './actions';


if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}


store.dispatch(subscribeOnMessage());
store.dispatch(subscribeOnChannels());

render(
  <Provider store={store}>
    <Context.Provider value={defaultContextValue}>
      <MainContainer />
    </Context.Provider>
  </Provider>,
  document.getElementById('main'),
);

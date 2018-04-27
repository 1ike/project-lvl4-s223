import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import gon from 'gon';

import reducers from './reducers';


const middlewares = [
  applyMiddleware(thunk),
];

if (window.__REDUX_DEVTOOLS_EXTENSION__) { // eslint-disable-line
  middlewares.push(window.__REDUX_DEVTOOLS_EXTENSION__()); // eslint-disable-line
}

export default createStore(
  reducers,
  gon,
  compose(...middlewares),
);

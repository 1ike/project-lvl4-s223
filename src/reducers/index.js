import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const currentUser = (state = {}) => state;
const channels = (state = {}) => state;
const currentChannelId = (state = {}) => state;


const messageAddingState = handleActions({
  [actions.addMessageRequest]() {
    return 'requested';
  },
  [actions.addMessageFailure]() {
    return 'failed';
  },
  [actions.addMessageSuccess]() {
    return 'successed';
  },
}, 'none');

const messages = handleActions({
  [actions.messageReceived](state, { payload }) {
    return [...state, payload];
  },
}, []);

// const newTaskText = handleActions({
//   [actions.addMessage]() {
//     return '';
//   },
//   [actions.updateNewTaskText](state, { payload: { text } }) {
//     return text;
//   },
// }, '');


export default combineReducers({
  form,
  currentUser,
  channels,
  currentChannelId,
  messages,
  messageAddingState,
});

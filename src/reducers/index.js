import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';


const channels = handleActions({
  [actions.channelDeleted](state, { payload: id }) {
    return state.filter(channel => channel.id !== id);
  },
}, {});


const currentChannelId = handleActions({
  [actions.setCurrentChannel](state, { payload }) {
    return payload;
  },
}, '1');


const channelDeletingState = handleActions({
  [actions.deleteChannelRequest]() {
    return 'requested';
  },
  [actions.deleteChannelFailure]() {
    return 'failed';
  },
  [actions.deleteChannelSuccess]() {
    return 'successed';
  },
}, 'none');

const defaultModalDeleteChannel = { channel: {}, show: false };
const modalDeleteChannel = handleActions({
  [actions.openModalDeleteChannel](state, { payload: channel }) {
    return { channel, show: true };
  },
  [actions.closeModalDeleteChannel]() {
    return defaultModalDeleteChannel;
  },
}, defaultModalDeleteChannel);


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
  [actions.setCurrentChannel](state) {
    return state;
  },
  [actions.channelDeleted](state, { payload: id }) {
    return state.filter(message => message.channelId !== id);
  },
}, []);


export default combineReducers({
  form,
  channels,
  currentChannelId,
  channelDeletingState,
  modalDeleteChannel,
  messageAddingState,
  messages,
});

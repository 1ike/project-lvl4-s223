import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';


/**
 * CHANNELS
 */

const currentChannelId = handleActions({
  [actions.setCurrentChannel](state, { payload: id }) {
    return id;
  },
}, 1);


const channels = handleActions({
  [actions.channelCreated](state, { payload: channel }) {
    return [...state, channel];
  },
  [actions.channelEdited](state, { payload: channel }) {
    const newState = [...state.filter(c => c.id !== channel.id), channel];
    return newState.sort((a, b) => a.id - b.id);
  },
  [actions.channelDeleted](state, { payload: id }) {
    return state.filter(channel => channel.id !== id);
  },
}, {});

// Create channel
const channelCreatingState = handleActions({
  [actions.createChannelRequest]() {
    return 'requested';
  },
  [actions.createChannelFailure]() {
    return 'failed';
  },
  [actions.createChannelSuccess]() {
    return 'successed';
  },
}, 'none');

const defaultModalCreateChannel = { channel: {}, show: false };
const modalCreateChannel = handleActions({
  [actions.openModalCreateChannel](state, { payload: channel }) {
    return { channel, show: true };
  },
  [actions.closeModalCreateChannel]() {
    return defaultModalCreateChannel;
  },
}, defaultModalCreateChannel);

// Edite channel
const channelEditingState = handleActions({
  [actions.editChannelRequest]() {
    return 'requested';
  },
  [actions.editChannelFailure]() {
    return 'failed';
  },
  [actions.editChannelSuccess]() {
    return 'successed';
  },
}, 'none');

const defaultModalEditChannel = { channel: {}, show: false };
const modalEditChannel = handleActions({
  [actions.openModalEditChannel](state, { payload: channel }) {
    return { channel, show: true };
  },
  [actions.closeModalEditChannel]() {
    return defaultModalEditChannel;
  },
}, defaultModalEditChannel);

// Delete channel
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


/**
 * MESSAGES
 */

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
  channelCreatingState,
  modalEditChannel,
  channelEditingState,
  modalCreateChannel,
  channelDeletingState,
  modalDeleteChannel,
  messageAddingState,
  messages,
});

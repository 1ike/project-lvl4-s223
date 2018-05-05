import { createAction } from 'redux-actions';
import axios from 'axios';

import socket from '../socket';
import routes from '../routes';


export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = (text, user, channelId, reset) => async (dispatch) => {
  dispatch(addMessageRequest());

  const url = routes.messages.getURL(channelId);

  const data = {
    data: {
      attributes: {
        text,
        user,
      },
    },
  };

  try {
    const response = await axios.post(url, data);
    const { data: { attributes: message } } = response.data;
    dispatch(addMessageSuccess({ message }));
    reset();
    // console.log(message);
  } catch (error) {
    console.log(error);
    dispatch(addMessageFailure());
  }
};

export const messageReceived = createAction('MESSAGE_RECEIVED');

export const subscribeOnMessage = () => (dispatch) => {
  socket.on('newMessage', (msg) => {
    dispatch(messageReceived(msg.data.attributes));
  });
};


export const setCurrentChannel = createAction('SET_CURRENT_CHANNEL');

export const openModalDeleteChannel = createAction('OPEN_MODAL_DELETE_CHANNEL');
export const closeModalDeleteChannel = createAction('CLOSE_MODAL_DELETE_CHANNEL');


export const deleteChannelRequest = createAction('CHANNEL_DELETE_REQUEST');
export const deleteChannelSuccess = createAction('CHANNEL_DELETE_SUCCESS');
export const deleteChannelFailure = createAction('CHANNEL_DELETE_FAILURE');

export const deleteChannel = channel => async (dispatch) => {
  dispatch(deleteChannelRequest());

  const url = routes.channel.getURL(channel.id);
  try {
    console.log(url);
    await axios.delete(url);
    // const response = await axios.delete(url);
    // const { data: { id } } = response.data;
    // if (id !== channel.id) throw Error('Upss, wrong channel was deleted...');
    dispatch(deleteChannelSuccess());
    dispatch(closeModalDeleteChannel());
  } catch (error) {
    console.log(error);
    dispatch(deleteChannelFailure());
  }
};

export const channelDeleted = createAction('CHANNEL_DELETED');

export const subscribeOnChannels = () => (dispatch, getStore) => {
  socket.on('removeChannel', ({ data: { id } }) => {
    const { currentChannelId } = getStore();
    const defaultChannelId = 1;
    if (id === currentChannelId) dispatch(setCurrentChannel(defaultChannelId));
    dispatch(channelDeleted(id));
  });
};

// export const addMessage = createAction('TASK_ADD', task =>
//   ({ task: { ...task, id: _.uniqueId() } }));

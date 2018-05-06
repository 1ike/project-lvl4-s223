import { createAction } from 'redux-actions';
import axios from 'axios';

import socket from '../socket';
import routes from '../routes';


/**
 * CHANNELS
 */

export const setCurrentChannel = createAction('SET_CURRENT_CHANNEL');

// Create channel
export const channelCreated = createAction('CHANNEL_CREATED');

export const openModalCreateChannel = createAction('OPEN_MODAL_CREATE_CHANNEL');
export const closeModalCreateChannel = createAction('CLOSE_MODAL_CREATE_CHANNEL');

export const createChannelRequest = createAction('CHANNEL_CREATE_REQUEST');
export const createChannelSuccess = createAction('CHANNEL_CREATE_SUCCESS');
export const createChannelFailure = createAction('CHANNEL_CREATE_FAILURE');

export const createChannel = (name, reset) => async (dispatch) => {
  dispatch(createChannelRequest());

  const url = routes.channels.getURL();
  try {
    const data = {
      data: {
        attributes: {
          name,
        },
      },
    };
    await axios.post(url, data);
    // const response = await axios.post(url);
    // const { data } = response.data;
    dispatch(createChannelSuccess());
    reset();
    dispatch(closeModalCreateChannel());
  } catch (error) {
    console.log(error);
    dispatch(createChannelFailure());
  }
};

// Edit channel
export const channelEdited = createAction('CHANNEL_EDITED');

export const openModalEditChannel = createAction('OPEN_MODAL_EDIT_CHANNEL');
export const closeModalEditChannel = createAction('CLOSE_MODAL_EDIT_CHANNEL');

export const editChannelRequest = createAction('CHANNEL_EDIT_REQUEST');
export const editChannelSuccess = createAction('CHANNEL_EDIT_SUCCESS');
export const editChannelFailure = createAction('CHANNEL_EDIT_FAILURE');

export const editChannel = (channel, reset) => async (dispatch) => {
  dispatch(editChannelRequest());

  const { name, id } = channel;

  const url = routes.channels.getURL(id);
  try {
    const data = {
      data: {
        attributes: {
          name,
        },
      },
    };

    await axios.patch(url, data);
    // const response = await axios.post(url);
    // const { data } = response.data;
    dispatch(editChannelSuccess());
    reset();
    dispatch(closeModalEditChannel());
  } catch (error) {
    console.log(error);
    dispatch(editChannelFailure());
  }
};

// Delete channel
export const channelDeleted = createAction('CHANNEL_DELETED');

export const openModalDeleteChannel = createAction('OPEN_MODAL_DELETE_CHANNEL');
export const closeModalDeleteChannel = createAction('CLOSE_MODAL_DELETE_CHANNEL');

export const deleteChannelRequest = createAction('CHANNEL_DELETE_REQUEST');
export const deleteChannelSuccess = createAction('CHANNEL_DELETE_SUCCESS');
export const deleteChannelFailure = createAction('CHANNEL_DELETE_FAILURE');

export const deleteChannel = channel => async (dispatch) => {
  dispatch(deleteChannelRequest());

  const url = routes.channels.getURL(channel.id);
  try {
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

// Listen all channels events
export const subscribeOnChannels = () => (dispatch, getStore) => {
  socket.on('newChannel', ({ data: { attributes: channel } }) => {
    dispatch(channelCreated(channel));
  });

  socket.on('renameChannel', ({ data: { attributes: channel } }) => {
    dispatch(channelEdited(channel));
  });

  socket.on('removeChannel', ({ data: { id } }) => {
    const { currentChannelId } = getStore();
    const defaultChannelId = 1;
    if (id === currentChannelId) dispatch(setCurrentChannel(defaultChannelId));
    dispatch(channelDeleted(id));
  });
};


/**
 * MESSAGES
 */

export const messageReceived = createAction('MESSAGE_RECEIVED');

// Add message
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
  } catch (error) {
    console.log(error);
    dispatch(addMessageFailure());
  }
};

// Listen all messages events
export const subscribeOnMessage = () => (dispatch) => {
  socket.on('newMessage', (msg) => {
    dispatch(messageReceived(msg.data.attributes));
  });
};


// export const addMessage = createAction('TASK_ADD', task =>
//   ({ task: { ...task, id: _.uniqueId() } }));

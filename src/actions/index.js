import { createAction } from 'redux-actions';
import axios from 'axios';

import socket from '../socket';
import { getPathFromRoute } from '../routes';


export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = (data, channelId) => (dispatch) => {
  dispatch(addMessageRequest());

  const url = getPathFromRoute('messages', channelId);

  axios.post(url, data)
    .then((response) => {
      if (response.status !== 201) throw Error('Something went wrong...');
      const { data: { attributes: message } } = response.data;
      dispatch(addMessageSuccess({ message }));
      console.log(message);
    })
    .catch((error) => {
      console.log(url);
      console.log(error);
      dispatch(addMessageFailure());
    });

  // try {
  // } catch (e) {
  // }
};

export const messageReceived = createAction('MESSAGE_RECEIVED');

export const receiveMessage = () => (dispatch) => {
  socket.on('newMessage', (msg) => {
    console.log('receiveMessage', msg.data.attributes);
    dispatch(messageReceived(msg.data.attributes));
  });
};

// export const addMessage = createAction('TASK_ADD', task =>
//   ({ task: { ...task, id: _.uniqueId() } }));

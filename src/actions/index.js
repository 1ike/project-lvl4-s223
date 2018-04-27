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

export const receiveMessage = () => (dispatch) => {
  socket.on('newMessage', (msg) => {
    dispatch(messageReceived(msg.data.attributes));
  });
};

// export const addMessage = createAction('TASK_ADD', task =>
//   ({ task: { ...task, id: _.uniqueId() } }));

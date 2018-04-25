import { createAction } from 'redux-actions';
import axios from 'axios';

import socket from '../socket';
import routes from '../routes';


export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = (text, user, channelId) => async (dispatch) => {
  dispatch(addMessageRequest());
  console.log(routes);
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
    if (response.status !== 201) throw Error('Something went wrong...');
    const { data: { attributes: message } } = response.data;
    dispatch(addMessageSuccess({ message }));
    console.log(message);
  } catch (error) {
    console.log(url);
    console.log(error);
    dispatch(addMessageFailure());
  }
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

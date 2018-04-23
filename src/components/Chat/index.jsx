import React from 'react';

import Messages from './Messages';
import MessageForm from './MessageForm';


export default class Chat extends React.Component {
  render() {
    return (
      <div id='chat' className='col-sm-9'>
      {/* <div className="row"> */}
        <Messages />
        <MessageForm />
      </div>
      // </div>
    );
  }
}

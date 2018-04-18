import React from 'react';

import Messages from './Messages';


export default class Chat extends React.Component {
  render() {
    return (
      <div id='chat' className='col-sm-9'>
        <Messages />
      </div>
    );
  }
}

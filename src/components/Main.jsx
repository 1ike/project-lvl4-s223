import React from 'react';

import Context from '../Context';

import Channels from './Channels';
import Messages from './Chat/Messages';
import MessageForm from './Chat/MessageForm';


function User() {
  return (
    <Context.Consumer>
      {context => (
        <div id='user'>
          <h2>Name</h2>
          <p>{context.currentUser.name}</p>
        </div>
      )}
    </Context.Consumer>
  );
}


export default function Main() {
  return (
    <React.Fragment>

      <div id='sidebar' className='col-sm-3'>
        <User />
        <Channels />
      </div>

      <Context.Consumer>
        {context => (
          <div id='chat' className='col-sm-9'>
            <Messages currentUser={context.currentUser}/>
            <MessageForm currentUser={context.currentUser}/>
          </div>
        )}
      </Context.Consumer>

    </React.Fragment>
  );
}

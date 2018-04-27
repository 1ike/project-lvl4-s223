import React from 'react';

import Context from '../Context';
import _connect from '../connect';

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


const mapStateToProps = (state) => {
  const props = {
    channels: state.channels,
  };
  return props;
};

@_connect(mapStateToProps)
class Channels extends React.Component {
  render() {
    return (
      <div id='channels' className='mt-5'>
        <h2>Channels:</h2>
        <ul>{this.props.channels.map(channel => (
          <li key={channel.id}>
            <a href="#" id={`channel_${channel.id}`}>{channel.name}</a>
          </li>
        ))}</ul>
      </div>
    );
  }
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

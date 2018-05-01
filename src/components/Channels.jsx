/* import React from 'react';

import _connect from '../connect';


const mapStateToProps = (state) => {
  const props = {
    channels: state.channels,
  };
  return props;
};


@_connect(mapStateToProps)
export default class Channels extends React.Component {
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
} */

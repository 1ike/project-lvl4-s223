import React from 'react';
import _ from 'lodash';


export default class Channels extends React.Component {
  render() {
    return (
      <div id='channels' className='mt-5'>
        <h2>Channels:</h2>
        <ul>{this.props.channels.map(channel => (
          <li key={_.uniqueId()}>
            <a href="#" id={`channel_${channel.id}`}>{channel.name}</a>
          </li>
        ))}</ul>
      </div>
    );
  }
}
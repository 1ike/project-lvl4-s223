import React from 'react';
import _ from 'lodash';
import _connect from '../../connect';


const mapStateToProps = (state) => {
  const props = {
    channels: state.channels,
  };
  return props;
};


class Channels extends React.Component {
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


export default _connect(mapStateToProps)(Channels);

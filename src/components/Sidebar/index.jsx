import React from 'react';

import Channels from './Channels.jsx';
import User from './User.jsx';


export default class Sidebar extends React.Component {
  render() {
    return (
      <div id='sidebar' className='col-sm-3'>
        <User />
        <Channels />
      </div>
    );
  }
}

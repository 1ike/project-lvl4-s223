import React from 'react';

import Channels from '../../containers/Sidebar/Channels';
import User from '../../containers/Sidebar/User';


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

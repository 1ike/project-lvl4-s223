import React from 'react';

import Sidebar from './Sidebar';
import Chat from './Chat';


export default class Main extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Sidebar />
        <Chat />
      </React.Fragment>
    );
  }
}

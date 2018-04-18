import React from 'react';


export default class User extends React.Component {
  render() {
    return (
      <div id='user'>
        <h2>Name</h2>
        <p>{this.props.user.name}</p>
      </div>
    );
  }
}

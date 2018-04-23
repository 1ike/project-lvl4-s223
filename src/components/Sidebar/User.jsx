import React from 'react';
import _connect from '../../connect';


const mapStateToProps = (state) => {
  const props = {
    currentUser: state.currentUser,
  };
  return props;
};

@_connect(mapStateToProps)
export default class User extends React.Component {
  render() {
    return (
      <div id='user'>
        <h2>Name</h2>
        <p>{this.props.currentUser.name}</p>
      </div>
    );
  }
}

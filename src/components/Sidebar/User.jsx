import React from 'react';
import _connect from '../../connect';


const mapStateToProps = (state) => {
  const props = {
    user: state.user,
  };
  return props;
};


class User extends React.Component {
  render() {
    return (
      <div id='user'>
        <h2>Name</h2>
        <p>{this.props.user.name}</p>
      </div>
    );
  }
}


export default _connect(mapStateToProps)(User);

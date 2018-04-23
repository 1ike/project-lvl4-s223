import React from 'react';
import _ from 'lodash';
import cn from 'classnames';

import _connect from '../../connect';


const mapStateToProps = (state) => {
  const props = {
    messages: state.messages,
    currentUser: state.currentUser,
  };
  return props;
};

@_connect(mapStateToProps)
export default class Messages extends React.Component {
  scrollToBottom() {
    this.el.scrollTop = this.el.scrollHeight;
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div
        id='messages'
        className='border border-primary'
        ref={(el) => { this.el = el; }} // eslint-disable-line
      >
        {this.props.messages.map((message) => {
          const userClass = cn({
            'ml-1 mr-2': true,
            messages__currentUser: message.user.name === this.props.currentUser.name,
          });

          return (
          <div key={_.uniqueId()}>
            <b className={userClass}>{message.user.name}:</b>
            {message.text}
          </div>
        );
})}
      </div>
    );
  }
}

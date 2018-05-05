import React from 'react';
import cn from 'classnames';

import _connect from '../../connect';
import adjustElemHeight from '../../lib';


const mapStateToProps = (state) => {
  const props = {
    messages: state.messages.filter(msg => msg.channelId === state.currentChannelId),
  };
  return props;
};

@_connect(mapStateToProps)
export default class Messages extends React.Component {
  setHeightAndScroll = () => {
    adjustElemHeight(this.el);
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollTop = this.el.scrollHeight;
  }

  componentDidMount() {
    this.setHeightAndScroll();

    window.addEventListener('resize', this.setHeightAndScroll);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div
        id='messages'
        className='border border-primary flex-grow-1 p-2'
        ref={(el) => { this.el = el; }} // eslint-disable-line
      >
        {this.props.messages.map((message) => {
          const userClass = cn({
            'ml-1 mr-2': true,
            messages__currentUser: message.user.name === this.props.currentUser.name,
          });

          return (
            <div key={message.id}>
              <b className={userClass}>{message.user.name}:</b>
              {message.text}
            </div>
          );
        })}
      </div>
    );
  }
}

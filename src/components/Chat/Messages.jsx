import React from 'react';
import _ from 'lodash';
import cn from 'classnames';
import $ from 'jquery';

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
  setHeight = () => {
    const { el } = this;
    const scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight,
    );
    const diff = scrollHeight - window.innerHeight;

    const elInitHeight = el.offsetHeight;
    const height = diff > 0 ? elInitHeight - diff : elInitHeight;
    el.style.height = `${height}px`;

    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollTop = this.el.scrollHeight;
  }

  componentDidMount() {
    this.setHeight();

    $(window).resize(this.setHeight);
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

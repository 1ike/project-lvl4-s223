import React from 'react';
import { Field, reduxForm } from 'redux-form';

import _connect from '../../connect';


const mapStateToProps = (state) => {
  const props = {
    currentChannelId: state.currentChannelId,
    messageAddingState: state.messageAddingState,
  };
  return props;
};


@reduxForm({ form: 'message' })
@_connect(mapStateToProps)
export default class MessageForm extends React.Component {
  addMessage = (value) => {
    const text = value.inputMessage;
    if (!text) return;

    this.props.addMessage(
      text,
      this.props.currentUser,
      this.props.currentChannelId,
      this.props.reset,
    );
  }

  focusInput() {
    this.input.getRenderedComponent().focus();
  }

  componentDidMount() {
    this.focusInput();
  }

  componentDidUpdate() {
    this.focusInput();
  }

  render() {
    const disabled = this.props.messageAddingState === 'requested';

    return (
      <form
        id='messageForm'
        className='mt-3'
        onSubmit={this.props.handleSubmit(this.addMessage)}
        >

        <Field
          component="textarea"
          name = 'inputMessage'
          className="form-control"
          id="inputMessage"
          rows="3"
          disabled={disabled}
          ref={(input) => { this.input = input; }}
          withRef
          autoFocus={true}
        />

        <button
          type="submit"
          disabled={disabled}
          className="btn btn-primary mt-3"
        >Send message</button>

      </form>
    );
  }
}


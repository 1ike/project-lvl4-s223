import React from 'react';
import { Field, reduxForm } from 'redux-form';
import _connect from '../../connect';


class MessageForm extends React.Component {
  addMessage = (value) => {
    const data = {
      data: {
        attributes: {
          text: value.inputMessage,
          user: this.props.currentUser,
        },
      },
    };
    this.props.addMessage(data, this.props.currentChannelId);
    this.props.reset();
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

const Form = reduxForm({ form: 'message' })(MessageForm);

const mapStateToProps = (state) => {
  const props = {
    currentUser: state.currentUser,
    currentChannelId: state.currentChannelId,
  };
  return props;
};

export default _connect(mapStateToProps)(Form);

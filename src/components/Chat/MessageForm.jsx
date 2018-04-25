import React from 'react';
import ReactDOM from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import _connect from '../../connect';


const mapStateToProps = (state) => {
  const props = {
    currentUser: state.currentUser,
    currentChannelId: state.currentChannelId,
  };
  return props;
};


@reduxForm({ form: 'message' })
@_connect(mapStateToProps)
export default class MessageForm extends React.Component {
  addMessage = (value) => {
    const text = value.inputMessage;
    // document.getElementById('inputMessage').focus();
    if (!text) return;

    this.props.addMessage(
      text,
      this.props.currentUser,
      this.props.currentChannelId,
    );
    this.props.reset();
  }

  componentDidMount() {
    console.log(ReactDOM.findDOMNode(this.input));
    ReactDOM.findDOMNode(this.input).focus();
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this.input).focus();
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
          ref={(input) => { this.input = input; }}
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


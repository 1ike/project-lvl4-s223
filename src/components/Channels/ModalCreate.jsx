import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';

import _connect from '../../connect';


const mapStateToProps = (state) => {
  const props = {
    modalCreateChannel: state.modalCreateChannel,
    channelCreatingState: state.channelCreatingState,
  };
  return props;
};

@reduxForm({ form: 'createChannel' })
@_connect(mapStateToProps)
export default class ModalCreate extends React.Component {
  inputName ='inputChannelName'

  createChannel = (value) => {
    const name = value[this.inputName];
    if (!name) {
      this.focusInput();
      return;
    }
    this.props.createChannel(name, this.props.reset);
  }

  closeModalCreate = () => {
    this.props.reset();
    this.props.closeModalCreateChannel();
  }

  focusInput = () => {
    this.input.getRenderedComponent().focus();
  }

  // componentDidMount() {
  //   this.focusInput();
  // }

  // componentDidUpdate() {
  //   this.focusInput();
  // }

  render() {
    const disabled = this.props.channelCreatingState === 'requested';

    return (
      <Modal show={this.props.modalCreateChannel.show} onHide={this.closeModalCreate}>
        <form
          id='messageForm'
          className='mt-3'
          onSubmit={this.props.handleSubmit(this.createChannel)}
        >
          <Modal.Header className='flex-row-reverse' closeButton>
            <Modal.Title>Create channel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Field
              component="input"
              name = {this.inputName}
              id={this.inputName}
              placeholder='Enter channel name here'
              className="form-control"
              disabled={disabled}
              ref={(input) => { this.input = input; }}
              withRef
              autoFocus={true}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModalCreate} className='mr-2'>Close</Button>
            <Button
              type="submit"
              bsStyle="success"
              disabled={disabled}
            >
              Create
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

    );
  }
}

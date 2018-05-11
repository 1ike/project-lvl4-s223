import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';

import _connect from '../../connect';


const mapStateToProps = (state) => {
  const props = {
    modalEditChannel: state.modalEditChannel,
    channelCreatingState: state.channelCreatingState,
  };
  return props;
};

@reduxForm({ form: 'editChannel' })
@_connect(mapStateToProps)
export default class ModalEdit extends React.Component {
  inputName = 'inputChannelNewName';

  editChannel = (value) => {
    const name = value[this.inputName];
    if (!name) {
      this.focusInput();
      return;
    }

    const updatedChannel = { id: this.props.modalEditChannel.channel.id, name };
    this.props.editChannel(updatedChannel, this.props.reset);
  }

  closeModalEdit = () => {
    this.props.reset();
    this.props.closeModalEditChannel();
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
    const { show, channel } = this.props.modalEditChannel;

    return (
      <Modal show={show} onHide={this.closeModalEdit}>
        <form
          id='messageForm'
          className='mt-3'
          onSubmit={this.props.handleSubmit(this.editChannel)}
        >
          <Modal.Header className='flex-row-reverse' closeButton>
            <Modal.Title>Edit channel &laquo;{channel.name}&raquo;</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Field
              component="input"
              name = {this.inputName}
              id={this.inputName}
              placeholder='Enter new name for channel'
              className="form-control"
              disabled={disabled}
              ref={(input) => { this.input = input; }}
              withRef
              autoFocus={true}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModalEdit} className='mr-2'>Close</Button>
            <Button
              type="submit"
              bsStyle="success"
              disabled={disabled}
            >
              Edit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

    );
  }
}

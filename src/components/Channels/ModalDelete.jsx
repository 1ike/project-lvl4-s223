import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import _connect from '../../connect';


const mapStateToProps = (state) => {
  const props = {
    modalDeleteChannel: state.modalDeleteChannel,
    channelDeletingState: state.channelDeletingState,
  };
  return props;
};

@_connect(mapStateToProps)
export default class ModalDelete extends React.Component {
  deleteChannel = () => {
    this.props.deleteChannel(this.props.modalDeleteChannel.channel);
  }

  closeModalDelete = () => {
    this.props.closeModalDeleteChannel();
  }


  render() {
    return (
      <Modal show={this.props.modalDeleteChannel.show}>
        <Modal.Body>
          <p className='mt-4'>
            Do you realy want to delete the channel
            &laquo;{this.props.modalDeleteChannel.channel.name}&raquo;?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeModalDelete} className='mr-2'>Close</Button>
          <Button
            onClick={this.deleteChannel}
            bsStyle="danger"
            disabled={this.props.channelDeletingState === 'requested'}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

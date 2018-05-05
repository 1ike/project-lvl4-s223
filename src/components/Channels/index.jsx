import React from 'react';

import _connect from '../../connect';
import ModalDelete from './ModalDelete';


const IconButton = (props) => {
  const src = `/assets/images/${props.img}`;
  return (
    <a href="#" role="button" aria-label={props.title} className="ml-3" onClick={props.onclick}>
      <img aria-hidden="true" className='icon' src={src} alt={props.title} title={props.title} />
    </a>
  );
};

const mapStateToProps = (state) => {
  const props = {
    channels: state.channels,
    currentChannelId: state.currentChannelId,
  };
  return props;
};

@_connect(mapStateToProps)
export default class Channels extends React.Component {
  chooseChannel = id => () => {
    if (this.props.currentChannelId === id) return;
    this.props.setCurrentChannel(id);
  }

  openModalDelete = id => (e) => {
    e.preventDefault();
    this.props.openModalDeleteChannel(id);
  }

  render() {
    // console.log(this.props);
    return (
      <div id='channels' className='mt-5'>
        <h2>Channels:</h2>
        <ul className='mt-3'>{this.props.channels.map(channel => (
          <li key={channel.id} className='mt-2'>
            <a
              href="#"
              id={`channel_${channel.id}`}
              onClick={this.chooseChannel(channel.id)}
            >
              {
                this.props.currentChannelId === channel.id
                  ? <b> {channel.name} </b>
                  : channel.name
              }
            </a>
            <IconButton title="Edit" img="pencil.svg" onclick={this.openModalDelete(channel)} />
            <IconButton title="Delete" img="x.svg" onclick={this.openModalDelete(channel)} />
          </li>
        ))}</ul>
        <button
          className='btn btn-outline-primary btn-sm mt-3 ml-3'
          onClick={this.chooseChannel()}
        >
          Create channel
        </button>
        <ModalDelete />
        {/* <Modal show={this.props.modalCreateChannel.show}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className='mt-4'>
                          </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModalCreate()} className='mr-2'>Close</Button>
            <Button
              onClick={this.createChannel()}
              bsStyle="danger"
              disabled={this.props.channelCreatingState === 'requested'}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal> */}
      </div>
    );
  }
}

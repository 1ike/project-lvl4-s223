import React from 'react';

import _connect from '../../connect';
import ModalCreate from './ModalCreate';
import ModalEdit from './ModalEdit';
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
  chooseChannel = id => (e) => {
    e.preventDefault();
    if (this.props.currentChannelId === id) return;
    this.props.setCurrentChannel(id);
  }

  openModalCreate = (e) => {
    e.preventDefault();
    this.props.openModalCreateChannel();
  }
  openModalEdit = channel => (e) => {
    e.preventDefault();
    this.props.openModalEditChannel(channel);
  }
  openModalDelete = channel => (e) => {
    e.preventDefault();
    this.props.openModalDeleteChannel(channel);
  }

  render() {
    return (
      <div id='channels' className='mt-5 mb-5'>

        <h2>Channels:</h2>

        <ul className='mt-3'>{this.props.channels.map(channel => (
          <li key={channel.id} className='mt-2'>
            <a
              href="#"
              id={`channel_${channel.id}`}
              className='mr-2'
              onClick={this.chooseChannel(channel.id)}
            >
              {
                this.props.currentChannelId === channel.id
                  ? <b>{channel.name}</b>
                  : channel.name
              }
            </a>
            <IconButton title="Edit" img="pencil.svg" onclick={this.openModalEdit(channel)} />
            {channel.removable &&
              <IconButton title="Delete" img="x.svg" onclick={this.openModalDelete(channel)}/>
            }
          </li>
        ))}</ul>

        <button
          className='btn btn-outline-primary btn-sm mt-3 ml-3'
          onClick={this.openModalCreate}
        >
          Create channel
        </button>

        <ModalCreate />
        <ModalEdit />
        <ModalDelete />

      </div>
    );
  }
}

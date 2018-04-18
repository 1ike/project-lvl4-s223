import { connect } from 'react-redux';
import Channels from '../../components/Sidebar/Channels.jsx';

const mapStateToProps = (state) => {
  const props = {
    channels: state.channels,
  };
  return props;
};

export default connect(mapStateToProps)(Channels);

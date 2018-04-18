import { connect } from 'react-redux';
import User from '../../components/Sidebar/User.jsx';

const mapStateToProps = (state) => {
  const props = {
    user: state.user,
  };
  return props;
};

export default connect(mapStateToProps)(User);

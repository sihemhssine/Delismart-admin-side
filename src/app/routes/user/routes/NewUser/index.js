import { connect } from 'react-redux';
import { createUser } from '../../../../../actions/User';
import NewUser from '../../../../../components/User/NewUser';
///components/user/NewUser 
const mapDispatchToProps = dispatch => {
  return {
    onAddUser: client => {
      dispatch(createUser(client ));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewUser);  
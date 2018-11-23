import React from 'react';
import { connect } from 'react-redux';
import User from '../components/User/User';
import { deleteUser } from '../actions/User';

function UserList({ users, onDelete }) {
  if (!users.length) {
    return (
      <div>
        No User
      </div>
    )
  }


  if (navigator.onLine) {
    console.log("ddddd")
  } else {
    console.log("ddddddd")
  }
  return (
    <div>
      {users.map(user => {
        return (
          <User user={user} onDelete={onDelete} key={user._id} />
        );
      })}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDelete: id => {
      dispatch(deleteUser(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
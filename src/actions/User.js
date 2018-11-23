import { ADD_USER, DELETE_USER, FETCH_USER, EDIT_USER } from 'constants/ActionTypes';
import axios from 'axios';

const apiUrl = 'http://localhost:4000/users';

export const createUser = ({ fullname, addr, accountid, tel, email, country, enrolmentdate }) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/add`, { fullname, addr, accountid, tel, email, country, enrolmentdate })
      .then(response => {
        dispatch(createUserSuccess(response.data))
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const createUserSuccess = (data) => {
  return {
    type: ADD_USER,
    payload: {
      _id: data._id,
      fullname: data.fullname,
      addr: data.addr,
      accountid: data.accountid,
      tel: data.tel,
      email: data.email,
      country: data.country,
      enrolmentdate: data.enrolmentdate
    }
  }
};

export const deleteUserSuccess = id => {
  return {
    type: DELETE_USER,
    payload: {
      id
    }
  }
}

export const deleteUser = id => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/delete/${id}`)
      .then(response => {
        dispatch(deleteUserSuccess(response.data))
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const fetchUsers = (users) => {
  return {
    type: FETCH_USER,
    users
  }
};

export const fetchAllUsers = () => {
  return (dispatch) => {
    return axios.get(apiUrl)
      .then(response => {
        dispatch(fetchUsers(response.data))
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const editUser = (id,user) => {
  console.log(user); 
  return (dispatch) =>{
  return axios.get(`${apiUrl}/update/`,{
    params:{
      user
    }
  })
  .then(response => {
    dispatch(editUserSuccess(response.data))
  })
  .catch(error => {
    throw (error);
  });
}
};


export const editUserSuccess = (data) => ({
  type: 'EDIT_USER',
payload: {
  _id: data._id,
   name: data.name,
   fullname: data.fullname,
   email: data.email,
   avatar: data.avatar,
   password: data.password,
   addr: data.addr, 
   country: data.country, 
   status: data.status, 
   date: data.date 
} 
});

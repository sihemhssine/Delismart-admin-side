import { ADD_CATEGORY,FILTER_CATEGORY,  DELETE_CATEGORY, FETCH_CATEGORY } from 'constants/ActionTypes';
import axios from 'axios';

const apiUrl = 'http://localhost:4000/categories';

export const createCategory = ({ name, description, image }) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/add`, { name, description, image })
      .then(response => {
        dispatch(createCategorySuccess(response.data))
        console.log('daata', response.data)
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const createCategorySuccess = (data) => {
   return {
    type: ADD_CATEGORY,
    payload: {
      _id: data._id,
      name: data.name,
      description: data.description,
      image: data.image

    }
  }
};

export const deleteCategorySuccess = id => {
  return {
    type: DELETE_CATEGORY,
    payload: {
      id
    }
  }
}

export const deleteCategory = id => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/delete/${id}`)
      .then(response => {
        dispatch(deleteCategorySuccess(response.data))
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const filterCategorySuccess = name  => {
  return {
    type: FILTER_CATEGORY,
    payload: {
      name 
    }
  }
}

export const filterCategory = id => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/filter/${id}`)
      .then(response => {
        dispatch(filterCategorySuccess(response.data))
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const fetchCategories = (categories) => {
  return {
    type: FETCH_CATEGORY,
    categories
  }
};

export const fetchAllCategories = () => {
  return (dispatch) => {
    return axios.get(apiUrl)
      .then(response => {
        dispatch(fetchCategories(response.data))
      })
      .catch(error => {
        throw (error);
      });
  };
};
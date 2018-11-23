import { ADD_PRODUCT, DELETE_PRODUCT, FETCH_PRODUCT } from 'constants/ActionTypes';
import axios from 'axios';

const apiUrl = 'http://localhost:4000/products';
export const createProduct = ({ label, description, category,
  img, weight, TVA, pricettc, tva, expdate, proddate, unity, color, reduction, quantity }) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/add`, {
      label, description, category,
      img, weight, TVA, pricettc, tva, expdate, proddate, unity, color, reduction, quantity
    })
      .then(response => {
        dispatch(createProductSuccess(response.data))
      })
      .catch(error => {
        throw (error);
      });
  };
};
 
export const createProductSuccess = (data) => {
  return {
    type: ADD_PRODUCT,
    payload: {
      _id: data._id,
      label: data.label,
      description: data.description,
      category: data.category,
      unity: data.unity,
      image: data.image,
      weight: data.weight,
      TVA: data.TVA,
      pricettc: data.pricettc,
      tva: data.tva,
      expdate: data.expdate,
      proddate: data.proddate,
      color: data.color,
      reduction: data.reduction

    }
  }
};

export const deleteProductSuccess = id => {
  return {
    type: DELETE_PRODUCT,
    payload: {
      id
    }
  }
}

export const deleteProduct = id => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/delete/${id}`)
      .then(response => {
        dispatch(deleteProductSuccess(response.data))
      })
      .catch(error => {
        throw (error);
      });
  };
};

//edit product 

export const editProductSuccess = (data) => ({
  type: 'EDIT_PRODUCT',
payload: {
  _id: data._id,
  label: data.label,
  description: data.description,
  category: data.category,
  unity: data.unity,
  image: data.image,
  weight: data.weight,
  TVA: data.TVA,
  pricettc: data.pricettc,
  tva: data.tva,
  expdate: data.expdate,
  proddate: data.proddate,
  color: data.color,
  reduction: data.reduction
  
}/*  */
});
export const editProduct = (id,product) => {
  console.log(product)
  return (dispatch) =>{
  return axios.get(`${apiUrl}/update/`,{
    params:{
      product
    }
  })
  .then(response => {
    dispatch(editProductSuccess(response.data))
  })
  .catch(error => {
    throw (error);
  });

}
};


export const fetchProducts = (products) => {
  return {
    type: FETCH_PRODUCT,
    products
  }
};

export const fetchAllProducts = () => {
  return (dispatch) => {
    return axios.get(apiUrl)
      .then(response => {
        dispatch(fetchProducts(response.data))
      })
      .catch(error => {
        throw (error);
      });
  };
};
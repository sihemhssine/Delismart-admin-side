import { connect } from 'react-redux';
import { createProduct } from '../actions';
import NewProduct from '../components/Product/NewProduct';

const mapDispatchToProps = dispatch => {
  return {
    onAddProduct: product => {
      dispatch(createProduct(product));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewProduct);  